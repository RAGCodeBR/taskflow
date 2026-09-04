# src/integrations/supabase/types.ts

Tipo: Modulo TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `export type Json =` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 2 | `  | string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 3 | `  | number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 4 | `  | boolean` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 5 | `  | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 6 | `  | { [key: string]: Json | undefined }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 7 | `  | Json[]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 8 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 9 | `export type Database = {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 10 | `  // Allows to automatically instantiate createClient with right options` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 11 | `  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 12 | `  __InternalSupabase: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 13 | `    PostgrestVersion: "14.5"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 14 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 15 | `  public: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `    Tables: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `      attachments: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `          file_name: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `          mime_type: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `          size_bytes: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `          storage_path: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `          task_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 26 | `          uploaded_by: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 28 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `          file_name: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `          mime_type?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `          size_bytes?: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `          storage_path: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `          task_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 36 | `          uploaded_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 38 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 40 | `          file_name?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `          mime_type?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `          size_bytes?: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `          storage_path?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `          task_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 46 | `          uploaded_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 48 | `        Relationships: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `            foreignKeyName: "attachments_task_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `            columns: ["task_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 53 | `            referencedRelation: "tasks"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 54 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 55 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 56 | `        ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 57 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 58 | `      board_preferences: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 59 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 60 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 61 | `          field_order: Json` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 62 | `          hidden_fields: Json` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 63 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `          interruption_color: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 65 | `          kanban_orientation: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 66 | `          updated_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 67 | `          user_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 68 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 69 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 70 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 71 | `          field_order?: Json` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 72 | `          hidden_fields?: Json` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 73 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 74 | `          interruption_color?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 75 | `          kanban_orientation?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 76 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 77 | `          user_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 78 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 79 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 80 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 81 | `          field_order?: Json` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 82 | `          hidden_fields?: Json` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 84 | `          interruption_color?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 85 | `          kanban_orientation?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 87 | `          user_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 88 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 89 | `        Relationships: []` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 91 | `      client_files: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 92 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 93 | `          client_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 94 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 95 | `          file_name: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 96 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 97 | `          mime_type: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 98 | `          position: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 99 | `          size_bytes: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 100 | `          source_attachment_id: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 101 | `          storage_path: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 102 | `          title: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 103 | `          uploaded_by: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 104 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 105 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 106 | `          client_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 108 | `          file_name: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 109 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 110 | `          mime_type?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `          position?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 112 | `          size_bytes?: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 113 | `          source_attachment_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 114 | `          storage_path: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 115 | `          title?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 116 | `          uploaded_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 117 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 118 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 119 | `          client_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 120 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 121 | `          file_name?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 122 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 123 | `          mime_type?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 124 | `          position?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 125 | `          size_bytes?: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 126 | `          source_attachment_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 127 | `          storage_path?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 128 | `          title?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 129 | `          uploaded_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 130 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 131 | `        Relationships: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 132 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 133 | `            foreignKeyName: "client_files_source_attachment_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 134 | `            columns: ["source_attachment_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 135 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 136 | `            referencedRelation: "attachments"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 137 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 138 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 139 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 140 | `            foreignKeyName: "client_files_client_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 141 | `            columns: ["client_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 142 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 143 | `            referencedRelation: "clients"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 144 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 145 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 146 | `        ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 147 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 148 | `      client_note_attachments: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 149 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 150 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 151 | `          file_name: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 152 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 153 | `          mime_type: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 154 | `          note_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 155 | `          size_bytes: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 156 | `          storage_path: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 157 | `          uploaded_by: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 158 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 159 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 160 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 161 | `          file_name: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 162 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 163 | `          mime_type?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 164 | `          note_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 165 | `          size_bytes?: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 166 | `          storage_path: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 167 | `          uploaded_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 168 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 169 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 170 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 171 | `          file_name?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 172 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 173 | `          mime_type?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 174 | `          note_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 175 | `          size_bytes?: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 176 | `          storage_path?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 177 | `          uploaded_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 178 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 179 | `        Relationships: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 180 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 181 | `            foreignKeyName: "client_note_attachments_note_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 182 | `            columns: ["note_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 183 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 184 | `            referencedRelation: "client_notes"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 185 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 186 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 187 | `        ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 188 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 189 | `      client_notes: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 190 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 191 | `          client_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 192 | `          content: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 193 | `          content_html: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 194 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 195 | `          created_by: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 196 | `          done: boolean` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 197 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 198 | `          note_date: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 199 | `          position: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 200 | `          task_id: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 201 | `          title: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 202 | `          updated_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 203 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 204 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 205 | `          client_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 206 | `          content?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 207 | `          content_html?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 208 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 209 | `          created_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 210 | `          done?: boolean` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 211 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 212 | `          note_date?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 213 | `          position?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 214 | `          task_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 215 | `          title?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 216 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 217 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 218 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 219 | `          client_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 220 | `          content?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 221 | `          content_html?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 222 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 223 | `          created_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 224 | `          done?: boolean` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 225 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 226 | `          note_date?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 227 | `          position?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 228 | `          task_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 229 | `          title?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 230 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 231 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 232 | `        Relationships: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 233 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 234 | `            foreignKeyName: "client_notes_client_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 235 | `            columns: ["client_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 236 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 237 | `            referencedRelation: "clients"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 238 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 239 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 240 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 241 | `            foreignKeyName: "client_notes_task_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 242 | `            columns: ["task_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 243 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 244 | `            referencedRelation: "tasks"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 245 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 246 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 247 | `        ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 248 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 249 | `      clients: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 250 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 251 | `          avatar_path: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 252 | `          color: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 253 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 254 | `          created_by: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 255 | `          description: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 256 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 257 | `          is_active: boolean` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 258 | `          name: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 259 | `          updated_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 260 | `          cnpj: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 261 | `          legal_name: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 262 | `          trade_name: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 263 | `          state_registration: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 264 | `          municipal_registration: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 265 | `          address: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 266 | `          phone: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 267 | `          email: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 268 | `          responsible: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 269 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 270 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 271 | `          avatar_path?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 272 | `          color?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 273 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 274 | `          created_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 275 | `          description?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 276 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 277 | `          is_active?: boolean` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 278 | `          name: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 279 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 280 | `          cnpj?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 281 | `          legal_name?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 282 | `          trade_name?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 283 | `          state_registration?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 284 | `          municipal_registration?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 285 | `          address?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 286 | `          phone?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 287 | `          email?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 288 | `          responsible?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 289 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 290 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 291 | `          avatar_path?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 292 | `          color?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 293 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 294 | `          created_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 295 | `          description?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 296 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 297 | `          is_active?: boolean` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 298 | `          name?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 299 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 300 | `          cnpj?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 301 | `          legal_name?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 302 | `          trade_name?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 303 | `          state_registration?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 304 | `          municipal_registration?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 305 | `          address?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 306 | `          phone?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 307 | `          email?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 308 | `          responsible?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 309 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 310 | `        Relationships: []` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 311 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 312 | `      client_departments: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 313 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 314 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 315 | `          client_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 316 | `          name: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 317 | `          description: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 318 | `          position: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 319 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 320 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 321 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 322 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 323 | `          client_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 324 | `          name: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 325 | `          description?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 326 | `          position?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 327 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 328 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 329 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 330 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 331 | `          client_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 332 | `          name?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 333 | `          description?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 334 | `          position?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 335 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 336 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 337 | `        Relationships: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 338 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 339 | `            foreignKeyName: "client_departments_client_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 340 | `            columns: ["client_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 341 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 342 | `            referencedRelation: "clients"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 343 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 344 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 345 | `        ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 346 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 347 | `      client_department_employees: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 348 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 349 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 350 | `          department_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 351 | `          person_type: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 352 | `          full_name: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 353 | `          document: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 354 | `          cbo: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 355 | `          role: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 356 | `          salary: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 357 | `          salary_extrafolha: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 358 | `          activities: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 359 | `          avatar_path: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 360 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 361 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 362 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 363 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 364 | `          department_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 365 | `          person_type?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 366 | `          full_name: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 367 | `          document?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 368 | `          cbo?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 369 | `          role?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 370 | `          salary?: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 371 | `          salary_extrafolha?: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 372 | `          activities?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 373 | `          avatar_path?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 374 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 375 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 376 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 377 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 378 | `          department_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 379 | `          person_type?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 380 | `          full_name?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 381 | `          document?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 382 | `          cbo?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 383 | `          role?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 384 | `          salary?: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 385 | `          salary_extrafolha?: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 386 | `          activities?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 387 | `          avatar_path?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 388 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 389 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 390 | `        Relationships: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 391 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 392 | `            foreignKeyName: "client_department_employees_department_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 393 | `            columns: ["department_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 394 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 395 | `            referencedRelation: "client_departments"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 396 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 397 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 398 | `        ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 399 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 400 | `      client_system_accesses: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 401 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 402 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 403 | `          client_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 404 | `          title: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 405 | `          login: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 406 | `          password: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 407 | `          notes: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 408 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 409 | `          updated_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 410 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 411 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 412 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 413 | `          client_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 414 | `          title: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 415 | `          login: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 416 | `          password: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 417 | `          notes?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 418 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 419 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 420 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 421 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 422 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 423 | `          client_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 424 | `          title?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 425 | `          login?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 426 | `          password?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 427 | `          notes?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 428 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 429 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 430 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 431 | `        Relationships: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 432 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 433 | `            foreignKeyName: "client_system_accesses_client_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 434 | `            columns: ["client_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 435 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 436 | `            referencedRelation: "clients"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 437 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 438 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 439 | `        ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 440 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 441 | `      comment_attachments: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 442 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 443 | `          comment_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 444 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 445 | `          file_name: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 446 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 447 | `          mime_type: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 448 | `          size_bytes: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 449 | `          storage_path: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 450 | `          task_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 451 | `          uploaded_by: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 452 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 453 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 454 | `          comment_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 455 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 456 | `          file_name: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 457 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 458 | `          mime_type?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 459 | `          size_bytes?: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 460 | `          storage_path: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 461 | `          task_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 462 | `          uploaded_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 463 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 464 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 465 | `          comment_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 466 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 467 | `          file_name?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 468 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 469 | `          mime_type?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 470 | `          size_bytes?: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 471 | `          storage_path?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 472 | `          task_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 473 | `          uploaded_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 474 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 475 | `        Relationships: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 476 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 477 | `            foreignKeyName: "comment_attachments_comment_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 478 | `            columns: ["comment_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 479 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 480 | `            referencedRelation: "comments"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 481 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 482 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 483 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 484 | `            foreignKeyName: "comment_attachments_task_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 485 | `            columns: ["task_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 486 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 487 | `            referencedRelation: "tasks"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 488 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 489 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 490 | `        ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 491 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 492 | `      comments: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 493 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 494 | `          author_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 495 | `          body: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 496 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 497 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 498 | `          position: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 499 | `          task_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 500 | `          title: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 501 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 502 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 503 | `          author_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 504 | `          body: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 505 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 506 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 507 | `          position?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 508 | `          task_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 509 | `          title?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 510 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 511 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 512 | `          author_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 513 | `          body?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 514 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 515 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 516 | `          position?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 517 | `          task_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 518 | `          title?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 519 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 520 | `        Relationships: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 521 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 522 | `            foreignKeyName: "comments_task_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 523 | `            columns: ["task_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 524 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 525 | `            referencedRelation: "tasks"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 526 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 527 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 528 | `        ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 529 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 530 | `      comment_mentions: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 531 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 532 | `          comment_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 533 | `          mentioned_user_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 534 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 535 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 536 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 537 | `          comment_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 538 | `          mentioned_user_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 539 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 540 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 541 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 542 | `          comment_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 543 | `          mentioned_user_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 544 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 545 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 546 | `        Relationships: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 547 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 548 | `            foreignKeyName: "comment_mentions_comment_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 549 | `            columns: ["comment_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 550 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 551 | `            referencedRelation: "comments"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 552 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 553 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 554 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 555 | `            foreignKeyName: "comment_mentions_mentioned_user_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 556 | `            columns: ["mentioned_user_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 557 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 558 | `            referencedRelation: "profiles"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 559 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 560 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 561 | `        ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 562 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 563 | `      kanban_columns: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 564 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 565 | `          client_id: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 566 | `          color: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 567 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 568 | `          created_by: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 569 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 570 | `          name: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 571 | `          position: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 572 | `          updated_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 573 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 574 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 575 | `          client_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 576 | `          color?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 577 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 578 | `          created_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 579 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 580 | `          name: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 581 | `          position?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 582 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 583 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 584 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 585 | `          client_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 586 | `          color?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 587 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 588 | `          created_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 589 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 590 | `          name?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 591 | `          position?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 592 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 593 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 594 | `        Relationships: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 595 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 596 | `            foreignKeyName: "kanban_columns_client_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 597 | `            columns: ["client_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 598 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 599 | `            referencedRelation: "clients"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 600 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 601 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 602 | `        ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 603 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 604 | `      notifications: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 605 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 606 | `          body: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 607 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 608 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 609 | `          is_read: boolean` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 610 | `          task_id: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 611 | `          title: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 612 | `          type: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 613 | `          user_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 614 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 615 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 616 | `          body?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 617 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 618 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 619 | `          is_read?: boolean` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 620 | `          task_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 621 | `          title: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 622 | `          type: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 623 | `          user_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 624 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 625 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 626 | `          body?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 627 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 628 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 629 | `          is_read?: boolean` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 630 | `          task_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 631 | `          title?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 632 | `          type?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 633 | `          user_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 634 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 635 | `        Relationships: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 636 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 637 | `            foreignKeyName: "notifications_task_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 638 | `            columns: ["task_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 639 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 640 | `            referencedRelation: "tasks"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 641 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 642 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 643 | `        ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 644 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 645 | `      profiles: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 646 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 647 | `          avatar_url: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 648 | `          color: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 649 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 650 | `          email: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 651 | `          full_name: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 652 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 653 | `          is_active: boolean` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 654 | `          theme_preferences: Json | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 655 | `          updated_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 656 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 657 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 658 | `          avatar_url?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 659 | `          color?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 660 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 661 | `          email?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 662 | `          full_name?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 663 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 664 | `          is_active?: boolean` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 665 | `          theme_preferences?: Json | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 666 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 667 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 668 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 669 | `          avatar_url?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 670 | `          color?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 671 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 672 | `          email?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 673 | `          full_name?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 674 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 675 | `          is_active?: boolean` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 676 | `          theme_preferences?: Json | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 677 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 678 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 679 | `        Relationships: []` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 680 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 681 | `      subtask_attachments: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 682 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 683 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 684 | `          file_name: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 685 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 686 | `          mime_type: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 687 | `          size_bytes: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 688 | `          storage_path: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 689 | `          subtask_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 690 | `          task_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 691 | `          uploaded_by: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 692 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 693 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 694 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 695 | `          file_name: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 696 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 697 | `          mime_type?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 698 | `          size_bytes?: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 699 | `          storage_path: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 700 | `          subtask_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 701 | `          task_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 702 | `          uploaded_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 703 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 704 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 705 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 706 | `          file_name?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 707 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 708 | `          mime_type?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 709 | `          size_bytes?: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 710 | `          storage_path?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 711 | `          subtask_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 712 | `          task_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 713 | `          uploaded_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 714 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 715 | `        Relationships: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 716 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 717 | `            foreignKeyName: "subtask_attachments_subtask_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 718 | `            columns: ["subtask_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 719 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 720 | `            referencedRelation: "subtasks"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 721 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 722 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 723 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 724 | `            foreignKeyName: "subtask_attachments_task_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 725 | `            columns: ["task_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 726 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 727 | `            referencedRelation: "tasks"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 728 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 729 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 730 | `        ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 731 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 732 | `      subtask_due_date_changes: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 733 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 734 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 735 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 736 | `          new_due_date: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 737 | `          old_due_date: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 738 | `          reason: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 739 | `          subtask_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 740 | `          user_id: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 741 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 742 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 743 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 744 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 745 | `          new_due_date?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 746 | `          old_due_date?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 747 | `          reason?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 748 | `          subtask_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 749 | `          user_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 750 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 751 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 752 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 753 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 754 | `          new_due_date?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 755 | `          old_due_date?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 756 | `          reason?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 757 | `          subtask_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 758 | `          user_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 759 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 760 | `        Relationships: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 761 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 762 | `            foreignKeyName: "subtask_due_date_changes_subtask_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 763 | `            columns: ["subtask_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 764 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 765 | `            referencedRelation: "subtasks"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 766 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 767 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 768 | `        ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 769 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 770 | `      subtasks: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 771 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 772 | `          assignee_id: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 773 | `          comment_id: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 774 | `          completed_at: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 775 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 776 | `          done: boolean` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 777 | `          due_date: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 778 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 779 | `          notes: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 780 | `          position: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 781 | `          task_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 782 | `          title: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 783 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 784 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 785 | `          assignee_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 786 | `          comment_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 787 | `          completed_at?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 788 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 789 | `          done?: boolean` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 790 | `          due_date?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 791 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 792 | `          notes?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 793 | `          position?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 794 | `          task_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 795 | `          title: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 796 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 797 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 798 | `          assignee_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 799 | `          comment_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 800 | `          completed_at?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 801 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 802 | `          done?: boolean` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 803 | `          due_date?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 804 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 805 | `          notes?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 806 | `          position?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 807 | `          task_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 808 | `          title?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 809 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 810 | `        Relationships: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 811 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 812 | `            foreignKeyName: "subtasks_comment_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 813 | `            columns: ["comment_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 814 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 815 | `            referencedRelation: "comments"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 816 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 817 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 818 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 819 | `            foreignKeyName: "subtasks_task_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 820 | `            columns: ["task_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 821 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 822 | `            referencedRelation: "tasks"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 823 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 824 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 825 | `        ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 826 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 827 | `      task_due_date_changes: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 828 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 829 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 830 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 831 | `          new_due_date: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 832 | `          old_due_date: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 833 | `          reason: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 834 | `          task_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 835 | `          user_id: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 836 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 837 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 838 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 839 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 840 | `          new_due_date?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 841 | `          old_due_date?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 842 | `          reason?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 843 | `          task_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 844 | `          user_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 845 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 846 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 847 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 848 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 849 | `          new_due_date?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 850 | `          old_due_date?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 851 | `          reason?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 852 | `          task_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 853 | `          user_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 854 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 855 | `        Relationships: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 856 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 857 | `            foreignKeyName: "task_due_date_changes_task_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 858 | `            columns: ["task_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 859 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 860 | `            referencedRelation: "tasks"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 861 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 862 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 863 | `        ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 864 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 865 | `      task_history: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 866 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 867 | `          action: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 868 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 869 | `          details: Json | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 870 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 871 | `          task_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 872 | `          user_id: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 873 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 874 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 875 | `          action: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 876 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 877 | `          details?: Json | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 878 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 879 | `          task_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 880 | `          user_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 881 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 882 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 883 | `          action?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 884 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 885 | `          details?: Json | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 886 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 887 | `          task_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 888 | `          user_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 889 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 890 | `        Relationships: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 891 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 892 | `            foreignKeyName: "task_history_task_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 893 | `            columns: ["task_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 894 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 895 | `            referencedRelation: "tasks"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 896 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 897 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 898 | `        ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 899 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 900 | `      task_interruptions: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 901 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 902 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 903 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 904 | `          reason: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 905 | `          task_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 906 | `          updated_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 907 | `          user_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 908 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 909 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 910 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 911 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 912 | `          reason?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 913 | `          task_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 914 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 915 | `          user_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 916 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 917 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 918 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 919 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 920 | `          reason?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 921 | `          task_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 922 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 923 | `          user_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 924 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 925 | `        Relationships: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 926 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 927 | `            foreignKeyName: "task_interruptions_task_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 928 | `            columns: ["task_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 929 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 930 | `            referencedRelation: "tasks"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 931 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 932 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 933 | `        ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 934 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 935 | `      task_statuses: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 936 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 937 | `          color: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 938 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 939 | `          created_by: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 940 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 941 | `          is_active: boolean` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 942 | `          is_completed: boolean` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 943 | `          name: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 944 | `          position: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 945 | `          updated_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 946 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 947 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 948 | `          color?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 949 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 950 | `          created_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 951 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 952 | `          is_active?: boolean` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 953 | `          is_completed?: boolean` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 954 | `          name: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 955 | `          position?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 956 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 957 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 958 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 959 | `          color?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 960 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 961 | `          created_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 962 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 963 | `          is_active?: boolean` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 964 | `          is_completed?: boolean` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 965 | `          name?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 966 | `          position?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 967 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 968 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 969 | `        Relationships: []` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 970 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 971 | `      task_tag_links: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 972 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 973 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 974 | `          tag_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 975 | `          task_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 976 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 977 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 978 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 979 | `          tag_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 980 | `          task_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 981 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 982 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 983 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 984 | `          tag_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 985 | `          task_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 986 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 987 | `        Relationships: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 988 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 989 | `            foreignKeyName: "task_tag_links_tag_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 990 | `            columns: ["tag_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 991 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 992 | `            referencedRelation: "task_tags"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 993 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 994 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 995 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 996 | `            foreignKeyName: "task_tag_links_task_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 997 | `            columns: ["task_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 998 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 999 | `            referencedRelation: "tasks"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1000 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1001 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1002 | `        ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1003 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1004 | `      task_tags: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1005 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1006 | `          color: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1007 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1008 | `          created_by: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1009 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1010 | `          name: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1011 | `          position: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1012 | `          updated_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1013 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1014 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1015 | `          color?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1016 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1017 | `          created_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1018 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1019 | `          name: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1020 | `          position?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1021 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1022 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1023 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1024 | `          color?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1025 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1026 | `          created_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1027 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1028 | `          name?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1029 | `          position?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1030 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1031 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1032 | `        Relationships: []` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1033 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1034 | `      tasks: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1035 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1036 | `          assignee_id: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1037 | `          assigned_at: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1038 | `          assigned_by: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1039 | `          card_width: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1040 | `          client_id: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1041 | `          color: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1042 | `          column_id: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1043 | `          completed_at: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1044 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1045 | `          created_by: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1046 | `          deleted_at: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1047 | `          deleted_by: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1048 | `          description: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1049 | `          due_date: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1050 | `          due_time: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1051 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1052 | `          interruptions: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1053 | `          position: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1054 | `          priority: Database["public"]["Enums"]["task_priority"] | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1055 | `          status: Database["public"]["Enums"]["task_status"] | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1056 | `          status_id: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1057 | `          tag_id: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1058 | `          title: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1059 | `          updated_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1060 | `          workspace_id: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1061 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1062 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1063 | `          assignee_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1064 | `          assigned_at?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1065 | `          assigned_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1066 | `          card_width?: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1067 | `          client_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1068 | `          color?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1069 | `          column_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1070 | `          completed_at?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1071 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1072 | `          created_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1073 | `          deleted_at?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1074 | `          deleted_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1075 | `          description?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1076 | `          due_date?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1077 | `          due_time?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1078 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1079 | `          interruptions?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1080 | `          position?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1081 | `          priority?: Database["public"]["Enums"]["task_priority"] | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1082 | `          status?: Database["public"]["Enums"]["task_status"] | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1083 | `          status_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1084 | `          tag_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1085 | `          title: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1086 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1087 | `          workspace_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1088 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1089 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1090 | `          assignee_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1091 | `          assigned_at?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1092 | `          assigned_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1093 | `          card_width?: number | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1094 | `          client_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1095 | `          color?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1096 | `          column_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1097 | `          completed_at?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1098 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1099 | `          created_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1100 | `          deleted_at?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1101 | `          deleted_by?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1102 | `          description?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1103 | `          due_date?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1104 | `          due_time?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1105 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1106 | `          interruptions?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1107 | `          position?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1108 | `          priority?: Database["public"]["Enums"]["task_priority"] | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1109 | `          status?: Database["public"]["Enums"]["task_status"] | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1110 | `          status_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1111 | `          tag_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1112 | `          title?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1113 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1114 | `          workspace_id?: string | null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1115 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1116 | `        Relationships: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1117 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1118 | `            foreignKeyName: "tasks_client_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1119 | `            columns: ["client_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1120 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1121 | `            referencedRelation: "clients"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1122 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1123 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1124 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1125 | `            foreignKeyName: "tasks_column_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1126 | `            columns: ["column_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1127 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1128 | `            referencedRelation: "kanban_columns"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1129 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1130 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1131 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1132 | `            foreignKeyName: "tasks_status_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1133 | `            columns: ["status_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1134 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1135 | `            referencedRelation: "task_statuses"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1136 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1137 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1138 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1139 | `            foreignKeyName: "tasks_tag_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1140 | `            columns: ["tag_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1141 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1142 | `            referencedRelation: "task_tags"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1143 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1144 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1145 | `        ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1146 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1147 | `      user_column_order: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1148 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1149 | `          column_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1150 | `          position: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1151 | `          updated_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1152 | `          user_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1153 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1154 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1155 | `          column_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1156 | `          position?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1157 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1158 | `          user_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1159 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1160 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1161 | `          column_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1162 | `          position?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1163 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1164 | `          user_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1165 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1166 | `        Relationships: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1167 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1168 | `            foreignKeyName: "user_column_order_column_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1169 | `            columns: ["column_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1170 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1171 | `            referencedRelation: "kanban_columns"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1172 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1173 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1174 | `        ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1175 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1176 | `      user_roles: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1177 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1178 | `          created_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1179 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1180 | `          role: Database["public"]["Enums"]["app_role"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1181 | `          user_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1182 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1183 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1184 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1185 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1186 | `          role?: Database["public"]["Enums"]["app_role"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1187 | `          user_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1188 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1189 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1190 | `          created_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1191 | `          id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1192 | `          role?: Database["public"]["Enums"]["app_role"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1193 | `          user_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1194 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1195 | `        Relationships: []` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1196 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1197 | `      user_task_order: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1198 | `        Row: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1199 | `          position: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1200 | `          task_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1201 | `          updated_at: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1202 | `          user_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1203 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1204 | `        Insert: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1205 | `          position?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1206 | `          task_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1207 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1208 | `          user_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1209 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1210 | `        Update: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1211 | `          position?: number` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1212 | `          task_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1213 | `          updated_at?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1214 | `          user_id?: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1215 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1216 | `        Relationships: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1217 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1218 | `            foreignKeyName: "user_task_order_task_id_fkey"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1219 | `            columns: ["task_id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1220 | `            isOneToOne: false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1221 | `            referencedRelation: "tasks"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1222 | `            referencedColumns: ["id"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1223 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1224 | `        ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1225 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1226 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1227 | `    Views: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1228 | `      [_ in never]: never` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1229 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1230 | `    Functions: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1231 | `      admin_get_profile_emails: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1232 | `        Args: never` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1233 | `        Returns: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1234 | `          email: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1235 | `          id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1236 | `        }[]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1237 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1238 | `      can_view_task: { Args: { _task_id: string }; Returns: boolean }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1239 | `      has_role: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1240 | `        Args: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1241 | `          _role: Database["public"]["Enums"]["app_role"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1242 | `          _user_id: string` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1243 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1244 | `        Returns: boolean` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1245 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1246 | `      seed_user_kanban_defaults: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1247 | `        Args: { _user_id: string }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1248 | `        Returns: undefined` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1249 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1250 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1251 | `    Enums: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1252 | `      app_role: "admin" | "member"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1253 | `      task_priority: "low" | "medium" | "high" | "urgent"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1254 | `      task_status: "todo" | "in_progress" | "review" | "done"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1255 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1256 | `    CompositeTypes: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1257 | `      [_ in never]: never` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1258 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1259 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1260 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1261 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1262 | `type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 1263 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1264 | `type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 1265 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1266 | `export type Tables<` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 1267 | `  DefaultSchemaTableNameOrOptions extends` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1268 | `    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1269 | `    | { schema: keyof DatabaseWithoutInternals },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1270 | `  TableName extends DefaultSchemaTableNameOrOptions extends {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1271 | `    schema: keyof DatabaseWithoutInternals` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1272 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1273 | `    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1274 | `        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1275 | `    : never = never,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1276 | `> = DefaultSchemaTableNameOrOptions extends {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1277 | `  schema: keyof DatabaseWithoutInternals` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1278 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1279 | `  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1280 | `      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1281 | `      Row: infer R` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1282 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1283 | `    ? R` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1284 | `    : never` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1285 | `  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1286 | `        DefaultSchema["Views"])` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1287 | `    ? (DefaultSchema["Tables"] &` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1288 | `        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1289 | `        Row: infer R` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1290 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1291 | `      ? R` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1292 | `      : never` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1293 | `    : never` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1294 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1295 | `export type TablesInsert<` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 1296 | `  DefaultSchemaTableNameOrOptions extends` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1297 | `    | keyof DefaultSchema["Tables"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1298 | `    | { schema: keyof DatabaseWithoutInternals },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1299 | `  TableName extends DefaultSchemaTableNameOrOptions extends {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1300 | `    schema: keyof DatabaseWithoutInternals` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1301 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1302 | `    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1303 | `    : never = never,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1304 | `> = DefaultSchemaTableNameOrOptions extends {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1305 | `  schema: keyof DatabaseWithoutInternals` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1306 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1307 | `  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1308 | `      Insert: infer I` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1309 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1310 | `    ? I` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1311 | `    : never` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1312 | `  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1313 | `    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1314 | `        Insert: infer I` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1315 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1316 | `      ? I` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1317 | `      : never` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1318 | `    : never` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1319 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1320 | `export type TablesUpdate<` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 1321 | `  DefaultSchemaTableNameOrOptions extends` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1322 | `    | keyof DefaultSchema["Tables"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1323 | `    | { schema: keyof DatabaseWithoutInternals },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1324 | `  TableName extends DefaultSchemaTableNameOrOptions extends {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1325 | `    schema: keyof DatabaseWithoutInternals` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1326 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1327 | `    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1328 | `    : never = never,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1329 | `> = DefaultSchemaTableNameOrOptions extends {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1330 | `  schema: keyof DatabaseWithoutInternals` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1331 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1332 | `  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1333 | `      Update: infer U` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1334 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1335 | `    ? U` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1336 | `    : never` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1337 | `  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1338 | `    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1339 | `        Update: infer U` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1340 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1341 | `      ? U` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1342 | `      : never` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1343 | `    : never` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1344 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1345 | `export type Enums<` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 1346 | `  DefaultSchemaEnumNameOrOptions extends` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1347 | `    | keyof DefaultSchema["Enums"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1348 | `    | { schema: keyof DatabaseWithoutInternals },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1349 | `  EnumName extends DefaultSchemaEnumNameOrOptions extends {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1350 | `    schema: keyof DatabaseWithoutInternals` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1351 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1352 | `    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1353 | `    : never = never,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1354 | `> = DefaultSchemaEnumNameOrOptions extends {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1355 | `  schema: keyof DatabaseWithoutInternals` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1356 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1357 | `  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1358 | `  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1359 | `    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1360 | `    : never` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1361 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1362 | `export type CompositeTypes<` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 1363 | `  PublicCompositeTypeNameOrOptions extends` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1364 | `    | keyof DefaultSchema["CompositeTypes"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1365 | `    | { schema: keyof DatabaseWithoutInternals },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1366 | `  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1367 | `    schema: keyof DatabaseWithoutInternals` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1368 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1369 | `    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1370 | `    : never = never,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1371 | `> = PublicCompositeTypeNameOrOptions extends {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1372 | `  schema: keyof DatabaseWithoutInternals` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1373 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1374 | `  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1375 | `  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1376 | `    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1377 | `    : never` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1378 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1379 | `export const Constants = {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 1380 | `  public: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1381 | `    Enums: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1382 | `      app_role: ["admin", "member"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1383 | `      task_priority: ["low", "medium", "high", "urgent"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1384 | `      task_status: ["todo", "in_progress", "review", "done"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1385 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1386 | `  },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1387 | `} as const` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1388 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
