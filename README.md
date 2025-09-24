# Lista de Tarefas

## Descrição do Projeto
Este projeto é uma aplicação web para gerenciamento de tarefas, permitindo que o usuário adicione, edite, conclua e exclua tarefas. Cada tarefa possui título, descrição, data/hora e status (concluída ou não).  

A aplicação possui **front-end** desenvolvido com **HTML, CSS e React.js** e **back-end** em **Java** utilizando **Firebase** como banco de dados.

---

## Funcionalidades

### Front-end
- Adicionar, editar, marcar como concluída e excluir tarefas.
- Exibição dinâmica das tarefas em lista.
  - Tarefas concluídas aparecem com estilo diferenciado (texto tachado).
- Formulário de adição/edição de tarefas com:
  - Campos de texto para título e descrição.
  - Campo de data e hora.
  - Botões para salvar e cancelar.
- Validações:
  - Título obrigatório.
  - Data/hora válida (não pode ser anterior ao horário atual).
  - Evita duplicidade de tarefas com mesmo título e data/hora.
- Layout responsivo para celular, tablet e desktop.
- Boas práticas:
  - Código separado entre HTML, CSS e JS.
  - Classes e IDs claros.
  - Código organizado e comentado.

### Back-end
- CRUD de tarefas no **Firebase**.
- Estrutura de cada tarefa:
  - `id` (gerado automaticamente pelo Firebase)
  - `titulo` (texto)
  - `descricao` (texto)
  - `dataHora` (timestamp)
  - `concluida` (boolean)
- Endpoints disponíveis:
  - `GET /tarefas` → lista todas as tarefas do usuário autenticado.
  - `POST /tarefas` → cria nova tarefa.
  - `PUT /tarefas/:id` → edita tarefa existente.
  - `PATCH /tarefas/:id/concluir` → marca como concluída/não concluída.
  - `DELETE /tarefas/:id` → remove uma tarefa.

---

## Tecnologias Utilizadas
- **Front-end:** HTML, CSS, React.js
- **Back-end:** Java
- **Banco de dados:** Firebase

---

## Como Executar
1. Clone o repositório.
2. Configure o Firebase no projeto Java conforme suas credenciais.
3. Execute o back-end Java.
4. Abra o front-end no navegador ou execute com `npm start` (React.js).
5. Comece a adicionar, editar e gerenciar suas tarefas!

Ou, se preferir, acesse [clicando aqui](https://to-do-list-indol-tau.vercel.app/)

---

## Observações
- Projeto desenvolvido como parte das Avaliações de Aproveitamento de Estudos.
- Todas as validações de formulário foram implementadas para garantir consistência e evitar erros.
