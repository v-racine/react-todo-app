import type { Todo, SelectedGroup } from "./types";
import { getFilteredTodos, getGroupTitle } from "./utils";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
  selectedGroup: SelectedGroup;
  onOpenModal: (todo: Todo | null) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function Main({
  todos,
  selectedGroup,
  onOpenModal,
  onToggle,
  onDelete,
}: Props) {
  const filtered = getFilteredTodos(todos, selectedGroup);
  const title = getGroupTitle(selectedGroup);

  return (
    <div id="items">
      <header>
        <label htmlFor="sidebar_toggle">
          <img src="/images/hamburger.png" alt="Toggle Sidebar" />
        </label>
        <dl>
          <dt>{title}</dt>
          <dd>{filtered.length}</dd>
        </dl>
      </header>
      <main>
        <label htmlFor="new_item" onClick={() => onOpenModal(null)}>
          <img src="/images/plus.png" alt="Add Todo Item" />
          <h2>Add new to do</h2>
        </label>
        <table style={{ borderSpacing: 0 }}>
          <tbody>
            {filtered.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onOpenModal}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
