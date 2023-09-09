/*
  Warnings:

  - You are about to drop the `_articletotag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_articletotag` DROP FOREIGN KEY `_ArticleToTag_A_fkey`;

-- DropForeignKey
ALTER TABLE `_articletotag` DROP FOREIGN KEY `_ArticleToTag_B_fkey`;

-- DropTable
DROP TABLE `_articletotag`;

-- CreateTable
CREATE TABLE `article_to_tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `articleId` VARCHAR(191) NOT NULL,
    `tagId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `article_to_tag` ADD CONSTRAINT `article_to_tag_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article_to_tag` ADD CONSTRAINT `article_to_tag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
