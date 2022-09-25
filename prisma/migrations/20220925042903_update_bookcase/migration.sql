/*
  Warnings:

  - The primary key for the `bookcase` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `bookcase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `bookcase` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`userId`, `bookId`, `chapterId`);
