# Piloto Railway privado

O contexto de upload é criado por `stage.py` usando uma lista permitida. Nunca executar `railway up` na instalação WA-AKG original, que contém dados e backups privados.

O serviço de teste usa PostgreSQL dedicado, volume `/app/data`, porta pública 8080 e WA-AKG apenas em `127.0.0.1:3039`. O launcher exige origem e identidade Supabase específicas. O banco inicial deve estar vazio; o modo `WHATSAPP_EMPTY_PILOT=true` exige zero sessões WhatsApp.

Não copiar `.env`, mídias, backups ou credenciais das sessões reais. As variáveis do serviço são configuradas pelo Railway CLI via stdin; não escrever segredos em arquivos de configuração ou argumentos de shell.

Configuração recomendada para aplicar no ambiente Railway com `railway environment edit` (o piloto já tem `/healthz` e três reinicializações; usa timeout padrão):

```sh
railway environment edit \
  --service-config whatsapp-private deploy.healthcheckPath /healthz \
  --service-config whatsapp-private deploy.healthcheckTimeout 300 \
  --service-config whatsapp-private deploy.restartPolicyMaxRetries 3
```

Uma réplica somente, Serverless desativado. Não usar `railway.json`: o Railway não aceita Config as Code em serviços novos. O Dockerfile é detectado automaticamente; alterações de infraestrutura são explícitas pelo CLI.

Antes de considerar qualquer liberação, confirmar `/healthz` 200 e HTTP/mídias/socket sem login 401, token inválido 403, zero sessões e mensagens no banco de teste e acesso positivo do titular pelo domínio definitivo. O Taskfloww publicado continua desabilitado até essa validação. Não anunciar este piloto no catálogo de atualizações.
