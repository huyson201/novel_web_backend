/*
  Warnings:

  - You are about to alter the column `name` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `books_slug_id_idx` ON `books`;

-- DropIndex
DROP INDEX `categories_slug_id_idx` ON `categories`;

-- DropIndex
DROP INDEX `chapters_chapterNumber_id_idx` ON `chapters`;

-- AlterTable
ALTER TABLE `books` ADD COLUMN `author` VARCHAR(100) NOT NULL DEFAULT 'Đang cập nhật',
    ADD COLUMN `desc` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `translator` VARCHAR(100) NOT NULL DEFAULT 'Đang cập nhật',
    MODIFY `image` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `state` VARCHAR(100) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `categories` MODIFY `name` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `chapters` ADD COLUMN `content` VARCHAR(191) NOT NULL DEFAULT '';

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(250) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(250) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_uid_key`(`uid`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
