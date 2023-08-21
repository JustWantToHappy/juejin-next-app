/*
  Warnings:

  - The primary key for the `collect` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `collect` table. All the data in the column will be lost.
  - Made the column `userId` on table `collect` required. This step will fail if there are existing NULL values in that column.
  - Made the column `articleId` on table `collect` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `collect` DROP FOREIGN KEY `Collect_articleId_fkey`;

-- DropForeignKey
ALTER TABLE `collect` DROP FOREIGN KEY `Collect_userId_fkey`;

-- AlterTable
ALTER TABLE `collect` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `articleId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Attention` (
    `follower` VARCHAR(191) NOT NULL,
    `followered` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Attention_follower_followered_key`(`follower`, `followered`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Collect` ADD CONSTRAINT `Collect_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Collect` ADD CONSTRAINT `Collect_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attention` ADD CONSTRAINT `Attention_follower_fkey` FOREIGN KEY (`follower`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
