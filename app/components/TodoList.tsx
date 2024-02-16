"use client";
import { Todo, TodoList } from "@/app/components/table";
import { use, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Ensure you have this import for the styles
import TodoComponent from "./Todo";

export default function TodoListComponent({
  todoList,
  submit,
}: {
  todoList: TodoList;
  submit: ({
    listTitle,
    dueDate,
    todos,
  }: {
    listTitle: string;
    dueDate: Date;
    todos: Array<Todo>;
  }) => void;
}) {
  const [listTitle, setListTitle] = useState(todoList.title as string);
  const [dueDate, setDueDate] = useState(new Date(todoList.dueDate as string));
  const [current, setCurrent] = useState<Todo>({
    title: "",
    completed: false,
  });
  const [todos, setTodos] = useState(todoList.Todo);

  return (
    <main>
      <div className="mx-auto max-w-4xl sm:px-6 lg:px-8 mt-10">
        <form className="grid grid-auto-cols border p-5 border-2 border-black">
          <div className="space-y-12">
            <div className="pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 max-w-[50vw] ">
                <div className="sm:col-span-4">
                  <input
                    type="text"
                    name="listTitle"
                    id="listTitle"
                    value={listTitle}
                    onChange={(e) => setListTitle(e.target.value)}
                    autoComplete="off"
                    className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-none focus:outline-none text-[60px] sm:leading-6"
                    placeholder="List Title"
                  />
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="dueDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Due Date
                  </label>
                  <DatePicker
                    selected={dueDate}
                    onChange={(date: Date) => setDueDate(date)}
                  />

                  <input
                    type="text"
                    name="newTodo"
                    id="newTodo"
                    value={current.title as string}
                    onChange={(e) =>
                      setCurrent({ ...current, title: e.target.value })
                    }
                    autoComplete="off"
                    className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-none focus:outline-none sm:leading-6"
                    placeholder="Add new todo"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // Prevent form submission
                        setTodos([...todos, current]);
                        setCurrent({ title: "", completed: false });
                      }
                    }}
                  />

                  <ul>
                    {todos.map((todo, index) => (
                      <TodoComponent
                        key={index}
                        index={index}
                        todo={todo}
                        todos={todos}
                        setTodos={setTodos}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button
              type="button"
              onClick={() => {
                submit({
                  listTitle,
                  dueDate,
                  todos,
                });
              }}
              className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
