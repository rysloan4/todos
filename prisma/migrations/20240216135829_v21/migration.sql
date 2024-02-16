-- AddForeignKey
ALTER TABLE "TodoList" ADD CONSTRAINT "TodoList_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
