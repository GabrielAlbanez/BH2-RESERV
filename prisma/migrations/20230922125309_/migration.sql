/*
  Warnings:

  - You are about to drop the column `idUsuario` on the `rifa` table. All the data in the column will be lost.
  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `funcionario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `CpfUsuario` to the `Rifa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexo` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `funcionario` DROP FOREIGN KEY `Funcionario_idOng_fkey`;

-- DropForeignKey
ALTER TABLE `rifa` DROP FOREIGN KEY `Rifa_idUsuario_fkey`;

-- AlterTable
ALTER TABLE `rifa` DROP COLUMN `idUsuario`,
    ADD COLUMN `CpfUsuario` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `usuario` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `cpf` INTEGER NOT NULL,
    ADD COLUMN `endereco` VARCHAR(191) NOT NULL,
    ADD COLUMN `sexo` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`cpf`);

-- DropTable
DROP TABLE `funcionario`;

-- CreateTable
CREATE TABLE `Voluntarios` (
    `cpf` INTEGER NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `idOng` INTEGER NOT NULL,

    PRIMARY KEY (`cpf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Voluntarios` ADD CONSTRAINT `Voluntarios_idOng_fkey` FOREIGN KEY (`idOng`) REFERENCES `Ong`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rifa` ADD CONSTRAINT `Rifa_CpfUsuario_fkey` FOREIGN KEY (`CpfUsuario`) REFERENCES `Usuario`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;
