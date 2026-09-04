# src/lib/duplicate-task.ts

Tipo: Modulo TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import type { Task } from "@/hooks/use-data";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { syncTaskAttachmentToClient } from "@/lib/sync-task-attachment-to-client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `type CopiedSubtask = {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 6 | `  title: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 7 | `  position: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 8 | `  assignee_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 9 | `  due_date: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 10 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 11 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 12 | `type CopiedComment = { body: string; author_id: string };` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 13 | `type CopiedTagLink = { tag_id: string };` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 14 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 15 | `/** Copies the task context that makes sense for a new activity. */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 16 | `export async function duplicateTask(task: Task, dueDate: string, userId: string) {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 17 | `  const newTaskId = crypto.randomUUID();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 18 | `  const { error: taskError } = await supabase.from("tasks").insert({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 19 | `    id: newTaskId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `    title: \`${task.title} (cópia)\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `    description: task.description,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `    status: task.status === "done" ? "todo" : task.status,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `    priority: task.priority,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `    column_id: task.column_id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `    client_id: task.client_id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 26 | `    assignee_id: task.assignee_id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `    due_date: new Date(\`${dueDate}T12:00:00\`).toISOString(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 28 | `    color: task.color,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `    status_id: task.status_id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `    completed_at: null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `    created_by: userId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `    position: 9999,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 34 | `  if (taskError) throw taskError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 35 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 36 | `  const { data: subtasks } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 37 | `    .from("subtasks")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 38 | `    .select("title, position, assignee_id, due_date")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `    .eq("task_id", task.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 40 | `  if (subtasks?.length) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 41 | `    await supabase.from("subtasks").insert(` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 42 | `      subtasks.map((subtask: CopiedSubtask) => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 43 | `        task_id: newTaskId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `        title: subtask.title,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `        done: false,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 46 | `        position: subtask.position,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `        assignee_id: subtask.assignee_id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 48 | `        due_date: subtask.due_date,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `      })),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 51 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 52 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 53 | `  const { data: comments } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 54 | `    .from("comments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 55 | `    .select("body, author_id")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 56 | `    .eq("task_id", task.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 57 | `  if (comments?.length) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 58 | `    await supabase` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 59 | `      .from("comments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 60 | `      .insert(comments.map((comment: CopiedComment) => ({ task_id: newTaskId, body: comment.body, author_id: comment.author_id })));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 61 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 62 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 63 | `  const { data: tagLinks } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 64 | `    .from("task_tag_links")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 65 | `    .select("tag_id")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 66 | `    .eq("task_id", task.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 67 | `  if (tagLinks?.length) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 68 | `    await supabase` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 69 | `      .from("task_tag_links")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 70 | `      .insert(tagLinks.map((tagLink: CopiedTagLink) => ({ task_id: newTaskId, tag_id: tagLink.tag_id })));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 71 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 72 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 73 | `  const { data: attachments } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 74 | `    .from("attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 75 | `    .select("file_name, storage_path, mime_type, size_bytes, uploaded_by")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 76 | `    .eq("task_id", task.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 77 | `  for (const attachment of attachments ?? []) {` | Inicia uma repeticao sobre dados ou condicoes. |
| 78 | `    if (attachment.mime_type === "text/uri-list") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 79 | `      await supabase.from("attachments").insert({ ...attachment, task_id: newTaskId });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 80 | `      continue;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 81 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 82 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 83 | `      const { data: fileData, error: downloadError } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 84 | `        .from("task-attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 85 | `        .download(attachment.storage_path);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `      if (downloadError || !fileData) continue;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 87 | `      const storagePath = \`${newTaskId}/${Date.now()}-${attachment.file_name}\`;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 88 | `      const { error: uploadError } = await supabase.storage.from("task-attachments").upload(storagePath, fileData, {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 89 | `        contentType: attachment.mime_type || "application/octet-stream",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 91 | `      if (uploadError) continue;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 92 | `      const { data: duplicatedAttachment, error: duplicateAttachmentError } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 93 | `        .from("attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 94 | `        .insert({ ...attachment, task_id: newTaskId, storage_path: storagePath, uploaded_by: userId })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 95 | `        .select("id")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 96 | `        .single();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 97 | `      if (duplicateAttachmentError || !duplicatedAttachment) continue;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 98 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 99 | `      try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 100 | `        await syncTaskAttachmentToClient({` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 101 | `          file: new File([fileData], attachment.file_name, {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 102 | `            type: attachment.mime_type || "application/octet-stream",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 103 | `          }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 104 | `          taskId: newTaskId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 105 | `          sourceAttachmentId: duplicatedAttachment.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 106 | `          sourceStoragePath: storagePath,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `          uploadedBy: userId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 108 | `          contentType: attachment.mime_type || "application/octet-stream",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 109 | `        });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 110 | `      } catch {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `        await supabase.from("attachments").delete().eq("id", duplicatedAttachment.id);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 112 | `        await supabase.storage.from("task-attachments").remove([storagePath]);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 113 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 114 | `    } catch {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 115 | `      // An attachment failure must not prevent the task copy from being created.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 116 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 117 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 118 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 119 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
