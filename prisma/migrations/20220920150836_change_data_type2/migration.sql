/*
  Warnings:

  - You are about to alter the column `chapterNumber` on the `chapters` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `chapters` MODIFY `chapterNumber` DOUBLE NOT NULL;
