import { PrismaClient } from "@prisma/client";
export async function GET(request: Request) {
  const client = new PrismaClient();
  const users = await client.user.findMany();
  const data = {
    status: 200,
    body: users,
  };
  return Response.json({ data });
}
