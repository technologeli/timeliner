/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Timeline` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Timeline` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Timeline_name_key" ON "Timeline"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Timeline_userId_key" ON "Timeline"("userId");
