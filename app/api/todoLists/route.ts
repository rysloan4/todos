import prisma from "@/app/lib/prisma";
import { Organization } from "@prisma/client";

export async function GET(request: Request) {
  const apiKey = request.headers.get("Authorization");
  const organization = await prisma.organization.findUnique({
    where: { api_key: apiKey as string },
    include: {
      todoLists: true,
    },
  });
  const todoLists = await prisma.todoList.findMany({
    where: {
      organization_id: organization?.id,
      archived: false,
    },
    include: {
      createdByUser: true,
    },
  });

  if (!organization) {
    return new Response("Unauthorized", { status: 401 });
  }

  return new Response(JSON.stringify(todoLists));
}

export async function POST(request: Request) {
  const apiKey = request.headers.get("Authorization");
  const organization = await prisma.organization.findUnique({
    where: { api_key: apiKey as string },
  });

  if (!organization) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await request.json();
  const todoList = await prisma.todoList.create({
    data: {
      title: data.title,
      status: data.status,
      priority: data.priority,

      dueDate: data.dueDate,
      createdByUserId: 4,
      assignedToUserId: 4,
      organization_id: organization.id,
      Todo: {
        create: data.Todo,
      },
    },
  });

  return new Response(JSON.stringify(todoList));
}
