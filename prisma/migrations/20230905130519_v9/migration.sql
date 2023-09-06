/*
  Warnings:

  - You are about to drop the column `bereplierId` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `replierId` on the `comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_replierId_fkey`;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `bereplierId`,
    DROP COLUMN `replierId`,
    ADD COLUMN `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
