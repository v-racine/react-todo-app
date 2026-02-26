import type { Todo, SelectedGroup } from "./types";

export function getTodoKey(todo: Todo): string {
  return todo.month && todo.year ? `${todo.month}/${todo.year}` : "No Due Date";
}

export function groupByDate(todos: Todo[]): Record<string, Todo[]> {
  const result: Record<string, Todo[]> = {};
  for (const todo of todos) {
    const key = getTodoKey(todo);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(todo);
  }
  return result;
}

export function getGroupTitle(group: SelectedGroup): string {
  switch (group.type) {
    case "all":
      return "All Todos";
    case "completed":
      return "Completed";
    case "all_date":
    case "completed_date":
      return group.date;
  }
}

export function getFilteredTodos(todos: Todo[], group: SelectedGroup): Todo[] {
  let filteredTodos: Todo[];
  switch (group.type) {
    case "all":
      filteredTodos = todos;
      break;
    case "all_date":
      filteredTodos = todos.filter((t) => getTodoKey(t) === group.date);
      break;
    case "completed":
      filteredTodos = todos.filter((t) => t.completed);
      break;
    case "completed_date":
      filteredTodos = todos.filter(
        (t) => t.completed && getTodoKey(t) === group.date,
      );
      break;
    default:
      filteredTodos = [];
  }

  return [
    ...filteredTodos.filter((t) => !t.completed),
    ...filteredTodos.filter((t) => t.completed),
  ];
}
