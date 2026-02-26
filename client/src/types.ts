export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  day: string;
  month: string;
  year: string;
  description: string;
}

export type SelectedGroup =
  | { type: "all" }
  | { type: "all_date"; date: string }
  | { type: "completed" }
  | { type: "completed_date"; date: string };

export type ModalState = { open: false } | { open: true; todo: Todo | null };
