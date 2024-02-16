import { useEffect, useState } from "react";

const statuses = {
  completed: "text-green-700 bg-green-50 ring-green-600/20",
  "in-progress": "text-gray-600 bg-gray-50 ring-gray-500/10",
  "not-started": "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export type TodoList = {
  id?: Number;
  title: String;
  status: String;
  priority: String;
  dueDate: String;
  createdByUser?: {
    first_name: String;
    last_name: String;
  };
  createdByUserId?: Number;
  assignedToUserId?: Number;
  organizationId: Number;
  Todo: Array<Todo>;
};

export type Todo = {
  id?: String;
  title: String;
  completed: Boolean;
  todoListId?: Number;
};

export default function Table() {
  const [todoLists, setTodoLists] = useState(Array<TodoList>());
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_API_KEY);
    async function fetchTodos() {
      const options = {
        method: "GET",
        headers: {
          Authorization: process.env.NEXT_PUBLIC_API_KEY as string,
        },
      };
      const response = await fetch("/api/todoLists", options);
      const data = await response.json();
      return data;
    }
    fetchTodos().then((data) => {
      setTodoLists(data);
      setLoading(false);
    });
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (todoLists.length === 0) {
    return (
      <>
        <div className="flex w-full justify-end">
          <button
            type="button"
            onClick={() => {
              window.location.href = "/app/todos/new";
            }}
            className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Todo List
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex w-full justify-end">
        <button
          type="button"
          onClick={() => {
            window.location.href = "/app/todos/new";
          }}
          className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create Todo List
        </button>
      </div>
      <ul role="list" className="divide-y border p-4 mt-4 divide-gray-100">
        {todoLists.map((todoList) => (
          <li
            key={todoList.id as number}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {todoList.title}
                </p>
                <p
                  className={classNames(
                    statuses[todoList.status as keyof typeof statuses],
                    "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                  )}
                >
                  {todoList.status}
                </p>
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p className="whitespace-nowrap">Due on {todoList.dueDate}</p>
                <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <p className="truncate">
                  Created by {todoList.createdByUser?.first_name}{" "}
                  {todoList.createdByUser?.last_name}
                </p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <a
                href={`/app/todos/${todoList.id}`}
                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
              >
                view todo list
                <span className="sr-only">, {todoList.title}</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
