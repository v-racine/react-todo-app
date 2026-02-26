import { useState } from "react";
import type { Todo } from "./types";

interface Props {
  todo: Todo | null;
  onSave: (data: Omit<Todo, "id">, id?: number) => void;
  onClose: () => void;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const YEARS = [
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
];

export default function Modal({ todo, onSave, onClose }: Props) {
  const [form, setForm] = useState({
    title: todo?.title ?? "",
    day: todo?.day ?? "",
    month: todo?.month ?? "",
    year: todo?.year ?? "",
    description: todo?.description ?? "",
  });

  const update = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, completed: todo?.completed ?? false }, todo?.id);
  };

  const handleMarkComplete = () => {
    if (!todo) {
      alert("Cannot mark a new todo as complete.");
      return;
    }
    onSave({ ...form, completed: true }, todo.id);
  };

  return (
    <>
      <div
        className="modal"
        id="modal_layer"
        style={{ display: "block" }}
        onClick={onClose}
      />
      <div className="modal" id="form_modal" style={{ display: "block" }}>
        <form onSubmit={handleSave}>
          <fieldset>
            <ul>
              <li>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Item 1"
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="due_day">Due Date</label>
                <div className="date">
                  <select
                    id="due_day"
                    value={form.day}
                    onChange={(e) => update("day", e.target.value)}
                  >
                    <option value="">Day</option>
                    {Array.from({ length: 31 }, (_, i) => {
                      const val = String(i + 1).padStart(2, "0");
                      return (
                        <option key={val} value={val}>
                          {i + 1}
                        </option>
                      );
                    })}
                  </select>
                  {" / "}
                  <select
                    id="due_month"
                    value={form.month}
                    onChange={(e) => update("month", e.target.value)}
                  >
                    <option value="">Month</option>
                    {MONTHS.map((name, i) => {
                      const val = String(i + 1).padStart(2, "0");
                      return (
                        <option key={val} value={val}>
                          {name}
                        </option>
                      );
                    })}
                  </select>
                  {" / "}
                  <select
                    id="due_year"
                    value={form.year}
                    onChange={(e) => update("year", e.target.value)}
                  >
                    <option value="">Year</option>
                    {YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows={7}
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                />
              </li>
              <li>
                <input type="submit" value="Save" />
                <button type="button" onClick={handleMarkComplete}>
                  Mark As Complete
                </button>
              </li>
            </ul>
          </fieldset>
        </form>
      </div>
    </>
  );
}
