import type { Todo } from "./types";

export function getTodoKey(todo: Todo): string {
  return todo.month && todo.year ? `${todo.month}/${todo.year}` : "No Due Date";
}

export function groupByDate(todos: Todo[]): Record<string, Todo[]> {
  return todos.reduce<Record<string, Todo[]>>((groups, todo) => {
    const key = getTodoKey(todo);
    return { ...groups, [key]: [...(groups[key] ?? []), todo] };
  }, {});
}
