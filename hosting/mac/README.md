# Chat privado no Mac

O Taskfloww continua na Vercel e seu banco continua no Supabase. Este serviço usa a instalação existente do WA-AKG e seu PostgreSQL local; não transfere conversas nem credenciais para outro banco.

## Serviços instalados em 21/10/2026

Os LaunchAgents `com.taskfloww.chat.database`, `app`, `gateway` e `awake` iniciam após o login do usuário no macOS. Os arquivos de execução ficam em `~/Library/Application Support/Taskfloww Chat`, com acesso restrito ao usuário. A configuração contém caminhos, não cópias de senhas.

- PostgreSQL: `127.0.0.1:55439`.
- WA-AKG: `127.0.0.1:3039`.
- Gateway privado: `127.0.0.1:3041`.
- `awake`: impede suspensão automática por inatividade; não impede desligamento ou suspensão ao fechar a tampa.

O supervisor adota o processo existente sem reiniciá-lo. Se esse processo terminar, inicia uma substituição. Não encerra sessões WhatsApp nem modifica suas credenciais. A reconexão da rede é responsabilidade do WA-AKG; uma sessão encerrada no celular pode exigir novo QR code.

Verificação: `/healthz` retornou 200; encerrar somente o processo do gateway resultou em reinício automático e nova resposta 200. Os processos existentes do WhatsApp e do PostgreSQL foram preservados. Reinício completo do Mac, suspensão e interrupção real da internet ainda não foram testados.

## Conexão externa — 21/10/2026

A conexão Cloudflare encaminha exclusivamente `chat.taskfloww.com.br` para o gateway `http://127.0.0.1:3041`. Nunca encaminhar diretamente a porta 3039. O titular criou o túnel `taskfloww-chat-mac`, ID `9e095280-bc9e-4a2f-8bb7-88806846d113`, e autorizou explicitamente a ativação da rota e a troca dos nameservers, preservando o site.

O agente `com.taskfloww.chat.tunnel` usa o cloudflared oficial instalado pelo Homebrew e lê a credencial do arquivo local `cloudflared-token`, com permissão 600. O token não aparece nos argumentos do processo nem no repositório. O painel confirmou estado Healthy e uma réplica ativa. O instalador adicional é `install-tunnel.py` e também recusa substituir um agente já existente.

Os nameservers `elmo.ns.cloudflare.com` e `paityn.ns.cloudflare.com` foram salvos na Locaweb e persistiram após recarregar o painel. A Cloudflare ainda aguarda propagação. Os dois registros A da raiz e o CNAME www do site foram mantidos em DNS only; o domínio www respondeu HTTP 200 após a alteração. O acesso público ao chat e o certificado ainda precisam ser verificados após a ativação. O frontend privado do Taskfloww não foi publicado.

HTTP, arquivos e WebSocket exigem autenticação. O gateway valida o UUID e o e-mail confirmado do titular, além do papel admin atual no Supabase. Esta versão permite somente o titular; não implementa liberação para outros usuários.

## Diagnóstico e parada

Os logs de cada serviço ficam na pasta `logs` da instalação, sem necessidade de publicar seu conteúdo. Consultar o estado com `launchctl print gui/$(id -u)/com.taskfloww.chat.gateway`.

Para desativar a inicialização de um serviço, executar `launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/com.taskfloww.chat.ROLE.plist`, substituindo `ROLE` por `database`, `app`, `gateway`, `tunnel` ou `awake`. Isso não apaga dados. Um processo adotado anteriormente continua funcionando: parar o supervisor não deve ser confundido com desligar a aplicação. Não apagar a pasta do WA-AKG, o banco ou as credenciais para desinstalar os agentes.

O instalador inicial recusa substituir agentes já registrados. Inspecionar os arquivos e atualizar de forma controlada; não executar outra instalação em paralelo.

## Atualizar o visual incorporado

O visual do WhatsApp no Taskfloww é servido pelo gateway deste Mac, não pela Vercel. O `npm run dev` injeta `src/styles/whatsapp-embed.css` e `.js` diretamente; no site publicado, o gateway lê as cópias instaladas desses arquivos. Por isso, um push para o repositório não atualiza sozinho o visual do chat.

Depois de revisar o código e publicar o frontend, execute na pasta `taskflow`:

```sh
python3 hosting/mac/update-gateway.py
python3 hosting/mac/update-gateway.py --apply
```

O primeiro comando apenas confere a instalação. O segundo compila o gateway, copia CSS e JS e reinicia somente o gateway. Ele preserva os arquivos anteriores com sufixo `.previous`; não reinicia o aplicativo WhatsApp nem o banco. Verifique o chat publicado após a mensagem `Updated gateway is healthy.`
