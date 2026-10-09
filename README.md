# Prova Técnica - Analista de QA | Fandi

Automação de testes E2E para o sistema ProvaCar utilizando Playwright com Page Object Model.

## Casos de Teste

**CT01 - Validação de campos obrigatórios**
Acessar "Novo modelo", clicar em Salvar sem preencher nenhum campo. O sistema deve exibir a mensagem informando que há campos obrigatórios não preenchidos.

**CT02 - Inclusão de veículo**
Preencher todos os campos do formulário (Família, Fabricante, Molicar, Modelo, Combustível, Portas, Ano início, Ano fim, Cilindradas, Cavalos) e salvar. O veículo deve aparecer na listagem após o cadastro.

**CT03 - Edição de veículo**
Clicar no botão de editar de qualquer registro da grid, alterar o nome do modelo e salvar. O valor atualizado deve refletir na listagem.

**CT04 - Exclusão de veículo**
Clicar no botão de excluir de um registro, confirmar a ação na modal de confirmação. O registro deve ser removido da listagem.

## Bugs encontrados

**Bug 1 - Typo no dropdown de Combustível**
Como reproduzir: Abrir o formulário "Novo modelo" e verificar as opções do campo Combustível.
A opção "Diesel" está cadastrada como "Disel" (faltando a letra "e").

**Bug 2 - Ausência de indicação visual em campos obrigatórios inválidos**
Como reproduzir: Abrir o formulário "Novo modelo", deixar todos os campos em branco e clicar em Salvar.
O sistema exibe apenas um toast genérico no topo da tela, sem destacar visualmente quais campos precisam ser preenchidos. O usuário precisa identificar os campos sozinho, o que prejudica a experiência.

## Melhorias sugeridas

**Máscaras de input**
Os campos numéricos como Ano, Portas e Cilindradas aceitam qualquer texto. Aplicar máscaras impediria dados inválidos de chegar ao banco.

**Reset do formulário ao reabrir o modal**
Se o usuário começar a preencher, fechar o modal e abrir novamente, os dados anteriores permanecem nos campos. Limpar o estado ao fechar evita confusões em cadastros consecutivos.

**Paginação na listagem**
Todos os registros carregam de uma vez na grid. Com o crescimento da base, isso pode comprometer bastante o desempenho da tela.

## Como executar

```bash
npm install
npx playwright test
```
