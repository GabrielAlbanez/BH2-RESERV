/*
  Warnings:

  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `voluntarios` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `rifa` DROP FOREIGN KEY `Rifa_CpfUsuario_fkey`;

-- AlterTable
ALTER TABLE `rifa` MODIFY `CpfUsuario` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usuario` DROP PRIMARY KEY,
    MODIFY `cpf` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`cpf`);

-- AlterTable
ALTER TABLE `voluntarios` DROP PRIMARY KEY,
    MODIFY `cpf` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`cpf`);

-- AddForeignKey
ALTER TABLE `Rifa` ADD CONSTRAINT `Rifa_CpfUsuario_fkey` FOREIGN KEY (`CpfUsuario`) REFERENCES `Usuario`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;
