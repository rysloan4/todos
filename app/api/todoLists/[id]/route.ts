import prisma from "@/app/lib/prisma";

export async function GET(req: Request) {
  const id = req.url.split("/").pop();
  const apiKey = req.headers.get("authorization");
  const organization = await prisma.organization.findUnique({
    where: {
      api_key: apiKey as string,
    },
  });
  if (!organization) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const todoList = await prisma.todoList.findUnique({
    where: {
      id: parseInt(id as string),
      organization_id: organization.id,
    },
    include: {
      createdByUser: true,
      Todo: true,
    },
  });
  return Response.json(todoList);
}

export async function PUT(req: Request) {
  const id = req.url.split("/").pop();
  const apiKey = req.headers.get("authorization");
  const organization = await prisma.organization.findUnique({
    where: {
      api_key: apiKey as string,
    },
  });
  if (!organization) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await req.json();
  delete data.id;
  console.log(data);
  const todoList = await prisma.todoList.update({
    where: {
      id: parseInt(id as string),
      organization_id: organization.id,
    },
    data: {
      title: data.title,
      status: data.status,
      priority: data.priority,
      dueDate: data.dueDate,
      createdByUserId: data.createdByUserId,
      assignedToUserId: data.assignedToUserId,
      Todo: {
        upsert: data.Todo.map((todo: any) => ({
          where: { id: todo.id },
          update: {
            title: todo.title,
            completed: todo.completed,
          },
          create: {
            title: todo.title,
            completed: todo.completed,
          },
        })),
      },
    },
  });
  return Response.json(todoList);
}
