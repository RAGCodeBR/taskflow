import { describe, expect, it } from "vitest";
import {
  attachImagesToDescription,
  pendingDescriptionImageIds,
  stripPendingDescriptionImages,
  stripStoredDescriptionImages,
} from "./task-description-images";

describe("task description images", () => {
  const draft = '<p>Primeiro card</p><img src="blob:preview-1" data-taskflow-pending-id="one" alt="um"><p>Segundo card</p><img src="blob:preview-2" data-taskflow-pending-id="two" alt="dois">';

  it("keeps each saved image in its original position without persisting blob URLs", () => {
    const saved = attachImagesToDescription(draft, new Map([["one", "attachment-1"], ["two", "attachment-2"]]));
    expect(saved).toBe('<p>Primeiro card</p><img src="taskflow-attachment://attachment-1" alt="um" data-task-attachment-id="attachment-1"><p>Segundo card</p><img src="taskflow-attachment://attachment-2" alt="dois" data-task-attachment-id="attachment-2">');
    expect(pendingDescriptionImageIds(saved).size).toBe(0);
  });

  it("excludes unsaved previews while retaining previously saved images", () => {
    const mixed = '<p>Texto</p><img src="taskflow-attachment://saved" data-task-attachment-id="saved">' + draft;
    expect(pendingDescriptionImageIds(mixed)).toEqual(new Set(["one", "two"]));
    expect(stripPendingDescriptionImages(mixed)).toBe('<p>Texto</p><img src="taskflow-attachment://saved" data-task-attachment-id="saved"><p>Primeiro card</p><p>Segundo card</p>');
    expect(stripStoredDescriptionImages(mixed)).toBe('<p>Texto</p>' + draft);
  });
});
