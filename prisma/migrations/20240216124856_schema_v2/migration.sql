/*
  Warnings:

  - You are about to drop the column `userId` on the `TodoList` table. All the data in the column will be lost.
  - Added the required column `createdByUserId` to the `TodoList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_todoListId_fkey";

-- DropForeignKey
ALTER TABLE "TodoList" DROP CONSTRAINT "TodoList_userId_fkey";

-- AlterTable
ALTER TABLE "TodoList" DROP COLUMN "userId",
ADD COLUMN     "assignedToUserId" INTEGER,
ADD COLUMN     "createdByUserId" INTEGER NOT NULL,
ADD COLUMN     "priority" TEXT NOT NULL DEFAULT 'medium',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'not-started';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "organizationId" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "email" SET DEFAULT 'rysloan4@gmail.com',
ALTER COLUMN "first_name" SET DEFAULT 'Ryan',
ALTER COLUMN "last_name" SET DEFAULT 'Sloan';

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'New Organization',
    "api_key" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_api_key_key" ON "Organization"("api_key");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
