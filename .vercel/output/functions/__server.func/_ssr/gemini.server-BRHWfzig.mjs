import { T as TSS_SERVER_FUNCTION } from "./server-DJ8sPH9h.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
async function generateGeminiContent({
  systemInstruction,
  parts,
  responseMimeType = "text/plain"
}) {
  throw new Error("A geração por IA está temporariamente em atualização.");
}
export {
  createServerRpc as c,
  generateGeminiContent as g
};
