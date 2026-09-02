# Ideias futuras

## Integração do TaskFlow com WhatsApp

Criar um canal oficial de WhatsApp Business para que colaboradores possam consultar e operar o TaskFlow fora do computador.

Funcionalidades iniciais:

- Consultar tarefas abertas, de hoje e atrasadas.
- Criar uma tarefa por conversa guiada, com confirmação antes de salvar.
- Concluir tarefas e consultar detalhes ou subtarefas.
- Associar o número de WhatsApp ao usuário correspondente do TaskFlow e respeitar as mesmas permissões já existentes.

Diretriz técnica: usar a API oficial do WhatsApp Business, com webhook e operações de servidor compartilhadas com o TaskFlow. O bot não deve gravar diretamente nas tabelas; assim, regras de clientes, responsáveis, histórico, notificações e integrações continuam centralizadas.

Evolução posterior: interpretar comandos em linguagem natural e enviar lembretes automáticos, respeitando as regras de mensagem da plataforma.
