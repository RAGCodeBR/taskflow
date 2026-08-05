// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { readFileSync } from "node:fs";
import { deflateSync, inflateSync } from "node:zlib";

function crc32(data: Buffer) {
  let crc = 0xffffffff;
  for (const byte of data) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type: string, data: Buffer) {
  const typeBytes = Buffer.from(type, "ascii");
  const chunk = Buffer.alloc(12 + data.length);
  chunk.writeUInt32BE(data.length, 0);
  typeBytes.copy(chunk, 4);
  data.copy(chunk, 8);
  chunk.writeUInt32BE(crc32(Buffer.concat([typeBytes, data])), 8 + data.length);
  return chunk;
}

function extractTimbradoPng(pdfPath: string) {
  const pdf = readFileSync(pdfPath);
  const objectStart = pdf.indexOf(Buffer.from("4 0 obj"));
  const streamMarker = pdf.indexOf(Buffer.from("stream"), objectStart);
  const dictionary = pdf.subarray(objectStart, streamMarker).toString("ascii");
  const length = Number(dictionary.match(/\/Length\s+(\d+)/)?.[1]);
  if (!Number.isFinite(length)) throw new Error("Não foi possível ler a imagem do papel timbrado.");
  let streamStart = streamMarker + "stream".length;
  if (pdf[streamStart] === 13) streamStart += 1;
  if (pdf[streamStart] === 10) streamStart += 1;
  const rgb = inflateSync(pdf.subarray(streamStart, streamStart + length));
  const width = 1414;
  const height = 2000;
  if (rgb.length !== width * height * 3) throw new Error("A imagem do papel timbrado tem um formato inesperado.");
  const scanlines = Buffer.alloc((width * 3 + 1) * height);
  for (let row = 0; row < height; row += 1) {
    rgb.copy(scanlines, row * (width * 3 + 1) + 1, row * width * 3, (row + 1) * width * 3);
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 2;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk("IHDR", header),
    pngChunk("IDAT", deflateSync(scanlines)),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

const timbradoImagePlugin = {
  name: "timbrado-pdf-to-png",
  enforce: "pre" as const,
  load(id: string) {
    if (!id.endsWith("?timbrado-png")) return null;
    const png = extractTimbradoPng(id.slice(0, -"?timbrado-png".length));
    return `export default ${JSON.stringify(`data:image/png;base64,${png.toString("base64")}`)};`;
  },
};

export default defineConfig({
  plugins: [timbradoImagePlugin],
  // Generate Vercel Build Output instead of the previous Cloudflare target.
  nitro: { preset: "vercel" },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
