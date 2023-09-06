/*
  Warnings:

  - You are about to drop the column `userId` on the `comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `userId`,
    ADD COLUMN `bereplierId` VARCHAR(191) NULL,
    ADD COLUMN `replierId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_replierId_fkey` FOREIGN KEY (`replierId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
