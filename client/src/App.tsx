import { useState, useEffect } from "react";
import type { Todo, SelectedGroup, ModalState } from "./types";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "./api";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<SelectedGroup>({
    type: "all",
  });
  const [modalState, setModalState] = useState<ModalState>({ open: false });

  useEffect(() => {
    fetchTodos().then(setTodos);
  }, []);

  const handleSelectGroup = (group: SelectedGroup) => {
    setSelectedGroup(group);
  };

  const handleOpenModal = (todo: Todo | null) => {
    setModalState({ open: true, todo });
  };

  const handleCloseModal = () => {
    setModalState({ open: false });
  };

  const handleToggle = async (id: number) => {
    const todo = todos.find((t) => t.id === id)!;
    const updated = await updateTodo(id, { completed: !todo.completed });
    setTodos(todos.map((t) => (t.id === id ? updated : t)));
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleSave = async (data: Omit<Todo, "id">, id?: number) => {
    if (id !== undefined) {
      const updated = await updateTodo(id, data);
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } else {
      const created = await createTodo(data);
      setTodos([...todos, created]);
      setSelectedGroup({ type: "all" });
    }
    setModalState({ open: false });
  };

  return (
    <div>
      <p>Todos loaded: {todos.length}</p>
    </div>
  );
}

export default App;
