import type { Todo, SelectedGroup } from "./types";
import { groupByDate } from "./utils";

interface Props {
  todos: Todo[];
  selectedGroup: SelectedGroup;
  onSelectGroup: (group: SelectedGroup) => void;
}

export default function Sidebar({
  todos,
  selectedGroup,
  onSelectGroup,
}: Props) {
  const completed = todos.filter((t) => t.completed);
  const allGroups = groupByDate(todos);
  const completedGroups = groupByDate(completed);

  return (
    <div id="sidebar">
      <section id="all">
        <div id="all_todos" onClick={() => onSelectGroup({ type: "all" })}>
          <header className={selectedGroup.type === "all" ? "active" : ""}>
            <dl>
              <dt>All Todos</dt>
              <dd>{todos.length}</dd>
            </dl>
          </header>
        </div>
        <article id="all_lists">
          {Object.entries(allGroups).map(([date, items]) => (
            <dl
              key={date}
              className={
                selectedGroup.type === "all_date" && selectedGroup.date === date
                  ? "active"
                  : ""
              }
              onClick={() => onSelectGroup({ type: "all_date", date })}
            >
              <dt>
                <time>{date}</time>
              </dt>
              <dd>{items.length}</dd>
            </dl>
          ))}
        </article>
      </section>

      <section className="completed" id="completed_items">
        <div
          id="completed_todos"
          onClick={() => onSelectGroup({ type: "completed" })}
        >
          <header
            className={selectedGroup.type === "completed" ? "active" : ""}
          >
            <dl>
              <dt>Completed</dt>
              <dd>{completed.length}</dd>
            </dl>
          </header>
        </div>
        <article id="completed_lists">
          {Object.entries(completedGroups).map(([date, items]) => (
            <dl
              key={date}
              className={
                selectedGroup.type === "completed_date" &&
                selectedGroup.date === date
                  ? "active"
                  : ""
              }
              onClick={() => onSelectGroup({ type: "completed_date", date })}
            >
              <dt>
                <time>{date}</time>
              </dt>
              <dd>{items.length}</dd>
            </dl>
          ))}
        </article>
      </section>
    </div>
  );
}
