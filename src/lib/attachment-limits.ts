export const MAX_TASK_ATTACHMENT_BYTES = 50 * 1024 * 1024;
export const MAX_TASK_ATTACHMENT_LABEL = "50 MB";

export function isTaskAttachmentTooLarge(file: File) {
  return file.size > MAX_TASK_ATTACHMENT_BYTES;
}
