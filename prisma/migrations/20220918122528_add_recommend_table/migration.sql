/*
  Warnings:

  - A unique constraint covering the columns `[bookId]` on the table `Slider` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `books` ADD COLUMN `view` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `slider` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `Recommend` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookId` INTEGER NOT NULL,
    `bannerImg` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Recommend_bookId_key`(`bookId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Slider_bookId_key` ON `Slider`(`bookId`);

-- AddForeignKey
ALTER TABLE `Recommend` ADD CONSTRAINT `Recommend_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
