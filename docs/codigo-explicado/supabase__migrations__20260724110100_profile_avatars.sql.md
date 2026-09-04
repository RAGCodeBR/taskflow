# supabase/migrations/20260724110100_profile_avatars.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `﻿INSERT INTO storage.buckets (id, name, public)` | Insere dados iniciais ou registros de apoio. |
| 2 | `VALUES ('profile-avatars', 'profile-avatars', true)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 3 | `ON CONFLICT (id) DO UPDATE SET public = true;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `DROP POLICY IF EXISTS profile_avatars_select ON storage.objects;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 6 | `DROP POLICY IF EXISTS profile_avatars_insert_own ON storage.objects;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 7 | `DROP POLICY IF EXISTS profile_avatars_update_own ON storage.objects;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 8 | `DROP POLICY IF EXISTS profile_avatars_delete_own ON storage.objects;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 9 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 10 | `CREATE POLICY profile_avatars_select ON storage.objects FOR SELECT TO public` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 11 | `USING (bucket_id = 'profile-avatars');` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 13 | `CREATE POLICY profile_avatars_insert_own ON storage.objects FOR INSERT TO authenticated` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 14 | `WITH CHECK (bucket_id = 'profile-avatars' AND (storage.foldername(name))[1] = auth.uid()::text);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 16 | `CREATE POLICY profile_avatars_update_own ON storage.objects FOR UPDATE TO authenticated` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 17 | `USING (bucket_id = 'profile-avatars' AND (storage.foldername(name))[1] = auth.uid()::text)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `WITH CHECK (bucket_id = 'profile-avatars' AND (storage.foldername(name))[1] = auth.uid()::text);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 20 | `CREATE POLICY profile_avatars_delete_own ON storage.objects FOR DELETE TO authenticated` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 21 | `USING (bucket_id = 'profile-avatars' AND (storage.foldername(name))[1] = auth.uid()::text);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
