import { useState, useEffect } from "react";
import type { Todo, SelectedGroup, ModalState } from "./types";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "./api";
import Sidebar from "./Sidebar";
import Main from "./MainArea";
import Modal from "./Modal";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<SelectedGroup>({
    type: "all",
  });
  const [modalState, setModalState] = useState<ModalState>({ open: false });

  useEffect(() => {
    fetchTodos().then(setTodos).catch(console.error);
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
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
      console.error(`Todo with id ${id} not found`);
      return;
    }
    try {
      const updated = await updateTodo(id, { completed: !todo.completed });
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleSave = async (data: Omit<Todo, "id">, id?: number) => {
    try {
      if (id !== undefined) {
        const updated = await updateTodo(id, data);
        setTodos(todos.map((t) => (t.id === id ? updated : t)));
      } else {
        const created = await createTodo(data);
        setTodos([...todos, created]);
        setSelectedGroup({ type: "all" });
      }
      setModalState({ open: false });
    } catch (error) {
      console.error("Failed to save todo:", error);
    }
  };

  return (
    <>
      <input type="checkbox" id="sidebar_toggle" />
      <Sidebar
        todos={todos}
        selectedGroup={selectedGroup}
        onSelectGroup={handleSelectGroup}
      />
      <Main
        todos={todos}
        selectedGroup={selectedGroup}
        onOpenModal={handleOpenModal}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
      {modalState.open && (
        <Modal
          todo={modalState.todo}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default App;
