function fileExtension(fileName: string) {
  return fileName.split(".").pop()?.toLocaleLowerCase() ?? "";
}

export function canPreviewAttachment(fileName: string, mimeType: string | null) {
  const mime = mimeType ?? "";
  const extension = fileExtension(fileName);
  return (
    mime.startsWith("image/") ||
    mime.startsWith("video/") ||
    mime.startsWith("audio/") ||
    mime.startsWith("text/") ||
    mime.includes("pdf") ||
    mime.includes("json") ||
    ["docx", "xlsx", "xlsm", "csv"].includes(extension)
  );
}
