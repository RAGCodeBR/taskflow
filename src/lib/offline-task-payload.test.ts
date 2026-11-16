import { describe, expect, it } from "vitest";
import { taskCreatePayloadForSync } from "./offline-task-payload";

describe("offline task create payload", () => {
  it("removes client-only and unapplied schema fields before synchronization", () => {
    expect(
      taskCreatePayloadForSync({
        id: "task-1",
        title: "Nova tarefa",
        assigned_by: null,
        assigned_at: null,
        temporary_ui_state: true,
        workspace_id: "workspace-1",
      }),
    ).toEqual({
      id: "task-1",
      title: "Nova tarefa",
      workspace_id: "workspace-1",
    });
  });

  it("mantém os campos do Marketing, da pauta e de rascunho", () => {
    const task = {
      id: "task-2",
      title: "Post da campanha",
      is_draft: false,
      objective_id: "objective-1",
      secondary_client_id: "client-2",
      additional_client_ids: ["client-2", "client-3"],
      recurring_meeting_agenda_item_id: "agenda-item-1",
      recurring_meeting_agenda_template_id: "template-1",
    };
    expect(taskCreatePayloadForSync(task)).toEqual(task);
  });

  it("descarta campos que só existem na tela, como a ocorrência da reunião", () => {
    expect(
      taskCreatePayloadForSync({ id: "task-3", recurring_meeting_occurrence_id: "occurrence-1" }),
    ).toEqual({ id: "task-3" });
  });
});
