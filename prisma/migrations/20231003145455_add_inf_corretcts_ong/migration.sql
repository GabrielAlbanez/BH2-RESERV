/*
  Warnings:

  - The primary key for the `ong` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ong` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Ong` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnpj` to the `Ong` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Ong` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Ong` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `Ong` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `rifa` DROP FOREIGN KEY `Rifa_idOng_fkey`;

-- DropForeignKey
ALTER TABLE `trabalho` DROP FOREIGN KEY `Trabalho_idOng_fkey`;

-- DropForeignKey
ALTER TABLE `voluntarios` DROP FOREIGN KEY `Voluntarios_idOng_fkey`;

-- AlterTable
ALTER TABLE `ong` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `cnpj` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `redesSociais` VARCHAR(191) NULL,
    ADD COLUMN `senha` VARCHAR(191) NOT NULL,
    ADD COLUMN `telefone` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`cnpj`);

-- AlterTable
ALTER TABLE `rifa` MODIFY `idOng` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `trabalho` MODIFY `idOng` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `voluntarios` MODIFY `idOng` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Ong_email_key` ON `Ong`(`email`);

-- AddForeignKey
ALTER TABLE `Voluntarios` ADD CONSTRAINT `Voluntarios_idOng_fkey` FOREIGN KEY (`idOng`) REFERENCES `Ong`(`cnpj`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trabalho` ADD CONSTRAINT `Trabalho_idOng_fkey` FOREIGN KEY (`idOng`) REFERENCES `Ong`(`cnpj`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rifa` ADD CONSTRAINT `Rifa_idOng_fkey` FOREIGN KEY (`idOng`) REFERENCES `Ong`(`cnpj`) ON DELETE CASCADE ON UPDATE CASCADE;
