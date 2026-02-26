import type { Todo } from "./types";

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
