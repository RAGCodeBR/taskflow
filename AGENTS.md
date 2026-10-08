# Regras do projeto TaskFlow

## Novas atualizações com miniatura

- Toda alteração perceptível para o usuário (funcionalidade, correção ou ajuste de interface) deve incluir uma entrada de atualização com miniatura, sem depender de um pedido adicional. Agrupe alterações relacionadas da mesma entrega em uma entrada.
- Cadastre a entrega no início de `APP_UPDATES` em `src/lib/app-updates.ts`, com identificador novo, título, data, ambientes, público e explicação curta e fiel ao comportamento implementado. Use a data do contexto do usuário, no fuso America/Sao_Paulo.
- Inclua ou atualize a miniatura em `src/components/UpdatePreviews.tsx` e registre seu tipo. A miniatura é obrigatória e deve ilustrar a alteração real; não use apenas uma imagem genérica nem dados reais de clientes.
- O catálogo alimenta automaticamente a versão do aviso, a novidade atual e o histórico. Não duplique títulos, versões ou datas em `UpdateCenter.tsx` e não remova entradas antigas.
- Preserve restrições por ambiente e público, o fluxo de atualização do service worker e os dados offline. Não limpe armazenamento local para forçar atualizações.
- Verifique os testes do catálogo/miniaturas e a apresentação em Marketing e Consultoria, em desktop e celular. Miniaturas são ilustrativas, não devem executar ações reais.
- Não anuncie uma mudança incompleta ou não entregue. Refatorações internas sem mudança perceptível e republicações do mesmo código não precisam criar uma novidade fictícia.
- Commit, push e deploy somente quando autorizados pelo usuário. Acrescentar a miniatura não autoriza publicação automática.
