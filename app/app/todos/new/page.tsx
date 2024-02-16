"use client";
import { Todo, TodoList } from "@/app/components/table";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Ensure you have this import for the styles
import TodoListComponent from "@/app/components/TodoList";

export default function NewTodoList() {
  const newTodoList = {
    title: "",
    dueDate: new Date().toISOString(),
    status: "open",
    priority: "low",
    createdByUserId: 1,
    organizationId: 2,
    Todo: [],
  } as TodoList;

  const submit = async ({
    listTitle,
    dueDate,
    todos,
  }: {
    listTitle: string;
    dueDate: Date;
    todos: Array<Todo>;
  }) => {
    console.log(todos);
    const response = await fetch("/api/todoLists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.NEXT_PUBLIC_API_KEY as string,
      },
      body: JSON.stringify({
        title: listTitle,
        dueDate: dueDate.toISOString(),
        status: "open",
        priority: "low",
        createdByUserId: 1,
        organizationId: 2,
        Todo: todos,
      } as TodoList),
    });
    const data = await response.json();
  };
  return <TodoListComponent todoList={newTodoList} submit={submit} />;
}
