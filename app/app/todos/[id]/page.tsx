"use client";

import TodoListComponent from "@/app/components/TodoList";
import { Todo, TodoList } from "@/app/components/table";
import { useEffect, useState } from "react";

export default function TodoList() {
  const [todoList, setTodoList] = useState({} as TodoList);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    async function fetchTodoList() {
      const options = {
        method: "GET",
        headers: {
          Authorization: process.env.NEXT_PUBLIC_API_KEY as string,
        },
      };
      const response = await fetch(`/api/todoLists/${id}`, options);
      const data = await response.json();
      return data;
    }
    fetchTodoList().then((data) => {
      setTodoList(data);
      setIsLoading(false);
    });
  });
  const submit = async ({
    listTitle,
    dueDate,
    todos,
  }: {
    listTitle: string;
    dueDate: Date;
    todos: Array<Todo>;
  }) => {
    const response = await fetch(`/api/todoLists/${todoList.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.NEXT_PUBLIC_API_KEY as string,
      },
      body: JSON.stringify({
        title: listTitle,
        dueDate: dueDate,
        Todo: todos,
      }),
    });
    const data = await response.json();
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return <TodoListComponent todoList={todoList} submit={submit} />;
}
