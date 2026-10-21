# Hospedagem do WhatsApp privado

## Decisão atual — 21/10/2026

O titular escolheu manter o servidor do chat no Mac, sem contratar hospedagem adicional. Taskfloww permanece na Vercel e seu banco permanece no Supabase. A liberação continua restrita ao titular e não deve gerar anúncio de atualização para os demais usuários.

Os agentes de inicialização do Mac e o gateway privado foram instalados e verificados; consultar `hosting/mac/README.md`. O titular criou o túnel Cloudflare; o conector instalado no Mac foi confirmado Healthy. A rota exclusiva para o gateway autenticado foi criada após autorização específica do titular. Os novos nameservers foram salvos na Locaweb e persistiram após recarregar. A propagação DNS, o certificado e a publicação do frontend ainda estão pendentes. Não há chat liberado no Taskfloww público.

A consulta autenticada da zona Locaweb mostrou apenas os registros A da raiz (`216.198.79.1`, `64.29.17.1`), CNAME `www` (`a4b8256bec3a5eb8.vercel-dns-017.com`) e os registros administrativos NS/SOA. A zona Free preparada na Cloudflare mantém os registros do site em DNS only. O painel Locaweb passou a usar `elmo.ns.cloudflare.com` e `paityn.ns.cloudflare.com`; a consulta pública ainda retornava os NS da Locaweb na última verificação. A consulta direta ao novo servidor Cloudflare confirmou os mesmos registros do site. `https://www.taskfloww.com.br` respondeu HTTP 200 após salvar a mudança. Não houve alteração no Supabase.

As primeiras tentativas de interromper o piloto Railway falharam. Uma nova tentativa em 21/10 funcionou: a consulta dos dois serviços retornou `deploymentId: null` e `status: null`, sem implantação ativa. Os volumes e o projeto foram preservados; não afirmar consumo total zero de armazenamento. Não foi ativada assinatura paga. Os detalhes abaixo registram a avaliação anterior e o piloto; não representam a arquitetura escolhida agora.

## Liberação sem anúncio

`scripts/private-pilot-release.mjs` preserva a casca pública e todos os arquivos públicos da versão atual, incluindo o service worker byte a byte. A captura recusa continuar se o SHA-256 do worker publicado mudar. Esses arquivos não contêm dados autenticados. Os acessos comuns continuam com o aplicativo publicado anteriormente, sem mudança de permissões ou de banco. APIs, funções de servidor e arquivos continuam disponíveis; os cinco identificadores de funções usados pelo cliente antigo foram encontrados no servidor novo.

O titular abre `/api/whatsapp-pilot`, fora do escopo de navegação do worker antigo. Essa página não registra um worker. Somente após validar UUID, e-mail confirmado e papel admin no gateway, o botão de ativação grava um seletor de versão no navegador e cancela o registro antigo nesse navegador. Não apaga caches, localStorage, tarefas ou dados offline. Em seguida abre `/whatsapp` com o menu privado.

O cookie de seleção não é autenticação e não concede acesso ao chat; HTTP, mídias e WebSocket continuam exigindo a sessão host-only do gateway. Outros usuários são negados pelo servidor mesmo se copiarem o seletor. O frontend não inclui entrada nova no catálogo.

Este congelamento é temporário para o piloto. Antes da próxima atualização pública, retirar os dois passos do script de build e as rotas do piloto de forma explícita, voltando ao fluxo normal de atualizações. Não manter o congelamento silenciosamente ao entregar novas funcionalidades para todos. Validar a implantação e o acesso real do titular antes de considerar a liberação concluída.

## Avaliação anterior — 20/10/2026

## Estado confirmado

- Conta Vercel: `ragcodebr-9388s-projects`, plano Hobby.
- Projeto: `taskflow`, repositório `RAGCodeBR/taskflow`.
- Domínio publicado: `taskfloww.com.br`.
- Última implantação consultada: concluída com sucesso em 19/10/2026, commit `95dcff21a087ecdd58e89fe55ec2bc4b32c949c6`.
- A tela Daemons da conta informa **No Daemons Configured**.
- O Taskfloww utiliza Supabase. O PostgreSQL das conversas do WhatsApp e suas mídias ainda estão no Mac.
- Não foi identificado acesso a uma VPS nas configurações locais verificadas. Isso não exclui a existência de outra contratação ou conta.
- A avaliação inicial não criou serviços. Depois da escolha e autorização do titular, foi criado no Railway o projeto `taskflow-whatsapp-private-pilot` com PostgreSQL e serviço privados de teste. Não houve transferência das conversas nem alteração no Taskfloww publicado.

## Limites relevantes da Vercel

Os Daemons da Vercel estão em beta e permitem processos contínuos. Porém não recebem tráfego HTTP/TCP de entrada, não são destino de rewrites e não têm armazenamento local persistente. No Hobby, há uma quota de CPU ativa e o serviço pode ser interrompido quando ela é atingida.

Fonte: https://vercel.com/docs/daemons/limits

O chat atual combina servidor HTTP/Socket.IO e conexão Baileys no mesmo processo, além de arquivos locais. Portanto, o Dockerfile atual não pode simplesmente ser colocado em um Daemon e funcionar como o teste local.

## Preparação necessária para a arquitetura atual

1. Escolher hospedagem com processo Node contínuo, HTTPS, WebSocket e disco persistente. Apresentar custo antes de qualquer contratação.
2. Preparar um ambiente de teste independente; manter o backend do WhatsApp atrás de um gateway autenticado, sem expor o acesso administrativo original.
3. Substituir a ponte exclusiva de desenvolvimento por um gateway de produção com cookies seguros, domínio explícito e validação do token Supabase no servidor. A versão atual é deliberadamente restrita a localhost e não está pronta para publicação.
4. Autorizar somente o usuário Supabase `f0265853-29fb-4301-bc58-d40f4d0c0493`, e-mail `reinangrupoahouse@gmail.com`, com papel administrativo atual. Negar outros usuários, inclusive outros administradores. Manter a checagem no HTTP, mídias e Socket.IO, não apenas no menu.
5. Preparar PostgreSQL, armazenamento persistente e backups. Manter os dados do WhatsApp separados dos dados funcionais do Taskfloww.
6. Corrigir a configuração Docker antes de construir: o Compose antigo usa MySQL, enquanto a aplicação atual usa PostgreSQL; excluir `.local`, arquivos de ambiente, backups e dados privados do contexto de build.
7. Fazer backup verificado do banco, mídias e chave de criptografia antes de qualquer migração. Não copiar credenciais nem banco para repositórios ou imagens Docker.
8. Testar autenticação negativa, isolamento, reconexão, anexos, histórico e restauração com dados fictícios. Não enviar mensagens reais para validar código.
9. Planejar a transferência das sessões: não iniciar simultaneamente o mesmo vínculo WhatsApp no Mac e no servidor. Combinar a transição antes de ativar os vínculos migrados.
10. Preparar a liberação somente para o titular. Não incluir essa entrega no catálogo, na barra ou no histórico de atualizações.
11. Após validação e autorização de publicação, ativar o serviço e o menu privado; verificar no domínio real e manter possibilidade de voltar à instalação local.

## Alternativa utilizando Daemons

Exigiria separar o processo Baileys do servidor web, conectar ambos por fila/banco e substituir o armazenamento local por armazenamento externo. Não foi implementada nem testada essa arquitetura.

## Próximo ponto de decisão

O titular escolheu Railway e autorizou o teste com banco novo e vazio. Projeto: `258673bc-3262-40d6-a117-46354fcd5906`, workspace `ragcodebr's Projects`. A autorização não inclui assinatura paga nem transferência das sessões reais.

## Piloto Railway

- `hosting/railway/stage.py` cria um contexto de build por lista permitida, sem `.env`, `.local`, mídias, backups, credenciais WhatsApp ou dependências do Mac.
- O launcher expõe somente o gateway autenticado; o WA-AKG original fica na interface interna `127.0.0.1:3039`.
- O token Supabase deve corresponder ao UUID, e-mail confirmado e papel admin do titular. Cookies são HttpOnly, Secure e SameSite=Strict; HTTP, arquivos e Socket.IO exigem sessão.
- Banco exclusivo Railway PostgreSQL. Inicialização permitida apenas se o banco estiver vazio; recusa tabelas de banco alheio. Credenciais internas aleatórias, sem login público original.
- O modo de teste recusa iniciar se houver sessões WhatsApp existentes. Não copiar autenticação local para este piloto.
- Volumes do teste: 500 MB para PostgreSQL e 500 MB para mídia. As mídias atuais locais ocupam aproximadamente 1,5 GB e não cabem no volume do teste.
- A conta usa os créditos gratuitos. Não foi ativada assinatura. Antes da operação definitiva, apresentar custos e armazenamento ao titular.
- Frontend publicado continua desabilitado. A configuração de produção só aceita o subdomínio HTTPS `chat.taskfloww.com.br`; o domínio temporário Railway serve à validação da infraestrutura, não à liberação do iframe em produção.
- Nenhuma entrada no catálogo/barra/histórico de atualizações para esta entrega, por instrução expressa do titular.

## Validação do piloto

- Build Linux concluído e gateway respondendo na nuvem.
- `GET /healthz`: HTTP 200, verificando PostgreSQL e servidor WA-AKG interno.
- Sem sessão, `/dashboard/chat`, `/api/media/...`, `/api/auth/session` e transporte Socket.IO: HTTP 401.
- Token inválido com origem Taskfloww: HTTP 403.
- Logs do launcher confirmam inicialização do banco exclusivo. As tabelas `Message` e `Session` foram verificadas no painel Railway: ambas vazias. Credenciais e conteúdo local não foram copiados.
- 90 testes locais passaram, incluindo titular exclusivo, identidades alternativas negadas, cookies Secure e origens inválidas.
- O PostgreSQL não tem endpoint público. A verificação via SSH não foi utilizada porque não havia chave SSH configurada; nenhuma chave foi criada.
- O Railway não aceita `railway.json` em serviços novos. A saúde `/healthz` e até 3 reinicializações foram configuradas explicitamente no serviço pelo CLI/painel. Manifesto efetivo da implantação `94bcc884-82a7-48cb-9b68-40e1e921c523`: SUCCESS, healthcheck `/healthz`, 3 tentativas, timeout padrão da plataforma.

Pendente: configuração DNS, validação positiva do titular no domínio definitivo, teste funcional completo com fixtures, definição do armazenamento/custos e autorização de transição dos vínculos reais. A infraestrutura de teste não equivale a liberar os números no Taskfloww publicado.
