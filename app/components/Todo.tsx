import { Todo } from "./table";

export default function TodoComponent({
  index,
  todo,
  todos,
  setTodos,
}: {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}) {
  return (
    <li key={index} className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={todo.completed as boolean}
        onChange={() => {
          const newTodos = todos.map((item, idx) =>
            idx === index ? { ...item, completed: !item.completed } : item,
          );
          setTodos(newTodos);
        }}
      />
      <input
        type="text"
        value={todo.title as string}
        onChange={(e) => {
          const newTodos = todos.map((item, idx) =>
            idx === index ? { ...item, title: e.target.value } : item,
          );
          setTodos(newTodos);
        }}
        className={
          `block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-none focus:outline-none sm:leading-6` +
          (todo.completed ? " line-through" : "")
        }
      />
    </li>
  );
}
