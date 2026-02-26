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
  const filtered = (() => {
    switch (group.type) {
      case "all":
        return todos;
      case "all_date":
        return todos.filter((t) => getTodoKey(t) === group.date);
      case "completed":
        return todos.filter((t) => t.completed);
      case "completed_date":
        return todos.filter((t) => t.completed && getTodoKey(t) === group.date);
    }
  })();
  return [
    ...filtered.filter((t) => !t.completed),
    ...filtered.filter((t) => t.completed),
  ];
}
