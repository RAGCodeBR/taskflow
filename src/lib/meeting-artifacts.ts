import { supabase } from "@/integrations/supabase/client";

export async function downloadMeetingArtifact(path: string, fileName: string) {
  const { data, error } = await supabase.storage.from("meeting-artifacts").download(path);
  if (error) throw error;
  downloadBlob(data, fileName);
}

export function downloadTranscriptText(content: string, fileName: string) {
  downloadBlob(new Blob([content], { type: "text/plain;charset=utf-8" }), fileName);
}

function downloadBlob(data: Blob, fileName: string) {
  const url = URL.createObjectURL(data);
  try {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } finally {
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }
}
