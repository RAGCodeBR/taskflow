# src/lib/sync-task-attachment-to-client.ts

Tipo: Modulo TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 3 | `export interface SyncedClientFile {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 4 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 5 | `  storagePath: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 6 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 7 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 8 | `export const taskAttachmentIdFromClientFilePath = (storagePath: string) =>` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 9 | `  storagePath.match(/\/attachment-([^/]+)\//)?.[1] ?? null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 10 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 11 | `/**` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 12 | ` * Exposes a task attachment in the client's file area when the task has a client.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 13 | ` * Both records reference the same Storage object and are linked by source_attachment_id.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 14 | ` */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 15 | `export async function syncTaskAttachmentToClient({` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 16 | `  file,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `  taskId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `  sourceAttachmentId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `  sourceStoragePath,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `  uploadedBy,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `  contentType = file.type || "application/octet-stream",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `  file: File;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `  taskId: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `  sourceAttachmentId: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 26 | `  sourceStoragePath: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `  uploadedBy: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 28 | `  contentType?: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `}): Promise<SyncedClientFile | null> {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `  const { data: task, error: taskError } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 31 | `    .from("tasks")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `    .select("client_id")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `    .eq("id", taskId)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `    .single();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `  if (taskError) throw taskError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 36 | `  if (!task.client_id) return null;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 37 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 38 | `  const { data, error: insertError } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 39 | `    .from("client_files")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 40 | `    .insert({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `      client_id: task.client_id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `      title: file.name,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `      file_name: file.name,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `      storage_path: sourceStoragePath,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `      mime_type: contentType,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 46 | `      size_bytes: file.size,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `      uploaded_by: uploadedBy,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 48 | `      source_attachment_id: sourceAttachmentId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `    })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `    .select("id")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `    .single();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 53 | `  if (insertError) throw insertError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 54 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 55 | `  return { id: data.id, storagePath: sourceStoragePath };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 56 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 57 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 58 | `export async function removeSyncedClientFile(file: SyncedClientFile | null) {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 59 | `  if (!file) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 60 | `  await supabase.from("client_files").delete().eq("id", file.id);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 61 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 62 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 63 | `export async function removeTaskAttachmentAndClientCopy(attachmentId: string) {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 64 | `  const [` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 65 | `    { data: attachment, error: attachmentError },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 66 | `    { data: linkedClientFiles, error: linkedClientFilesError },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 67 | `    { data: legacyClientFiles, error: legacyClientFilesError },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 68 | `  ] = await Promise.all([` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 69 | `    supabase` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 70 | `      .from("attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 71 | `      .select("storage_path, mime_type")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 72 | `      .eq("id", attachmentId)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 73 | `      .maybeSingle(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 74 | `    supabase` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 75 | `      .from("client_files")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 76 | `      .select("id, storage_path")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 77 | `      .eq("source_attachment_id", attachmentId),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 78 | `    supabase` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 79 | `      .from("client_files")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 80 | `      .select("id, storage_path")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 81 | `      .like("storage_path", \`%/attachment-${attachmentId}/%\`),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 82 | `  ]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `  if (attachmentError) throw attachmentError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 84 | `  if (linkedClientFilesError) throw linkedClientFilesError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 85 | `  if (legacyClientFilesError) throw legacyClientFilesError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 86 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 87 | `  const clientFiles = [...(linkedClientFiles ?? []), ...(legacyClientFiles ?? [])].filter(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 88 | `    (file, index, allFiles) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 89 | `      allFiles.findIndex((candidate) => candidate.id === file.id) === index,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 90 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 91 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 92 | `  const clientFileIds = clientFiles.map((file: { id: string }) => file.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 93 | `  if (clientFileIds.length > 0) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 94 | `    const { error: clientFileDeleteError } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 95 | `      .from("client_files")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 96 | `      .delete()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 97 | `      .in("id", clientFileIds);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 98 | `    if (clientFileDeleteError) throw clientFileDeleteError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 99 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 100 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 101 | `  if (attachment) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 102 | `    const { error: attachmentDeleteError } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 103 | `      .from("attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 104 | `      .delete()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 105 | `      .eq("id", attachmentId);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 106 | `    if (attachmentDeleteError) throw attachmentDeleteError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 107 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 108 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 109 | `  const storagePaths = [` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 110 | `    ...(attachment?.mime_type === "text/uri-list" || !attachment ? [] : [attachment.storage_path]),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `    ...clientFiles.map((file: { storage_path: string }) => file.storage_path),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 112 | `  ];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 113 | `  const uniqueStoragePaths = [...new Set(storagePaths)];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 114 | `  if (uniqueStoragePaths.length > 0) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 115 | `    const { error: storageError } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 116 | `      .from("task-attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 117 | `      .remove(uniqueStoragePaths);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 118 | `    if (storageError)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 119 | `      console.error(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 120 | `        "Could not remove attachment objects after deleting their records",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 121 | `        storageError,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 122 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 123 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 124 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 125 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
