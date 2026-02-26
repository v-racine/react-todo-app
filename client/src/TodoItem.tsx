import type { Todo } from "./types";
import { getTodoKey } from "./utils";

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const displayTitle = `${todo.title} - ${getTodoKey(todo)}`;

  return (
    <tr data-id={todo.id}>
      <td className="list_item" onClick={() => onToggle(todo.id)}>
        <input
          type="checkbox"
          id={`item_${todo.id}`}
          checked={todo.completed}
          onChange={() => {}}
        />
        <span className="check" />
        <label
          htmlFor={`item_${todo.id}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEdit(todo);
          }}
        >
          {displayTitle}
        </label>
      </td>
      <td className="delete" onClick={() => onDelete(todo.id)}>
        <img src="/images/trash.png" alt="Delete" />
      </td>
    </tr>
  );
}
