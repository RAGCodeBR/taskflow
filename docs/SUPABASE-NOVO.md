# Banco Supabase novo

Este projeto deve usar um Supabase separado do Lovable/original e separado da copia atual.

## Passos

1. Crie um projeto novo no Supabase.
2. Copie `Project URL` e `anon public key`.
3. Rode as migrations em `supabase/migrations` no banco novo.
4. Configure o build com:

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=SUA_ANON_PUBLIC_KEY
```

## Projeto criado nesta copia

- Project ref: `xlcurhbxexyunpkcswwo`
- Project URL: `https://xlcurhbxexyunpkcswwo.supabase.co`
- Plano observado no painel: Free/Livre

## Por que as chaves entram no build?

GitHub Pages e um host estatico. Nao existe backend lendo `.env` em runtime. O Vite substitui `VITE_*` quando gera os arquivos finais.

## O que nao copiar

- Nao copie dados do Supabase antigo.
- Nao use `service_role` no frontend.
- Nao misture migrations novas no projeto Lovable.
- Nao use a URL antiga do banco atual.

## Cadastro somente por convite

Depois de aplicar a migration `20260803113000_invite_only_auth.sql`, cadastros
diretos sao recusados pelo banco. Para concluir a configuracao do convite:

1. Publique a funcao `admin-user-access` no Supabase.
2. Cadastre `https://seu-dominio.com/auth?invite=1` em **Auth > URL Configuration > Redirect URLs**.
3. Crie o secret da Edge Function `INVITE_REDIRECT_URL` com essa mesma URL.
4. Em **Auth > Email Templates**, mantenha habilitado o template de convite e
   ajuste a validade do token de convite para 24 ou 48 horas, conforme a politica desejada.

O administrador passa a usar **Usuarios > Novo usuario > Enviar convite**. O
Supabase envia um link individual ao e-mail indicado e, ao abri-lo, a pessoa
define a propria senha. O token e de uso unico e fica vinculado ao destinatario.
