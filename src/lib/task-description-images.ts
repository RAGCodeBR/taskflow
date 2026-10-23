const imageTag = /<img\b[^>]*>/gi;
const pendingAttribute = /\sdata-taskflow-pending-id=(['"])([^'"]+)\1/i;
const storedImage = /(?:data-task-attachment-id|src=['"]taskflow-attachment:\/\/)/i;

export function stripPendingDescriptionImages(html: string) {
  return html.replace(imageTag, (tag) => pendingAttribute.test(tag) ? "" : tag);
}

export function stripStoredDescriptionImages(html: string) {
  return html.replace(imageTag, (tag) => storedImage.test(tag) ? "" : tag);
}

export function pendingDescriptionImageIds(html: string) {
  return new Set([...html.matchAll(imageTag)]
    .map(([tag]) => tag.match(pendingAttribute)?.[2])
    .filter((id): id is string => Boolean(id)));
}

export function attachImagesToDescription(html: string, attachmentIds: ReadonlyMap<string, string>) {
  return html.replace(imageTag, (tag) => {
    const pendingId = tag.match(pendingAttribute)?.[2];
    const attachmentId = pendingId && attachmentIds.get(pendingId);
    if (!attachmentId) return tag;
    const withoutPending = tag.replace(pendingAttribute, "");
    const withSource = /\ssrc=(['"])[^'"]*\1/i.test(withoutPending)
      ? withoutPending.replace(/\ssrc=(['"])[^'"]*\1/i, ` src="taskflow-attachment://${attachmentId}"`)
      : withoutPending.replace(/\s*\/?>$/, ` src="taskflow-attachment://${attachmentId}">`);
    return withSource.replace(/\s*\/?>$/, ` data-task-attachment-id="${attachmentId}">`);
  });
}
