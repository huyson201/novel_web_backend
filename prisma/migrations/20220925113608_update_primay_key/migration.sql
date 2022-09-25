/*
  Warnings:

  - The primary key for the `bookcase` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `bookcase` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`userId`, `bookId`);
