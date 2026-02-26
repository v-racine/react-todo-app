import type { Todo } from "./types";

const BASE = "/api/todos";

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(BASE);
  if (!res.ok) {
    throw new Error(`Failed to fetch todos. Status: ${res.status}`);
  }
  return res.json();
}

export async function createTodo(data: Omit<Todo, "id">): Promise<Todo> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to create todo. Status: ${res.status}`);
  }
  return res.json();
}

export async function updateTodo(
  id: number,
  data: Partial<Omit<Todo, "id">>,
): Promise<Todo> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(
      `Failed to update todo with ID ${id}. Status ${res.status}`,
    );
  }
  return res.json();
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });

  if (!res.ok) {
    throw new Error(
      `Failed to delete todo with ID ${id}. Staus: ${res.status}`,
    );
  }
}
