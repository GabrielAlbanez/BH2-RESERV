/*
  Warnings:

  - Added the required column `telefone` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `telefone` VARCHAR(191) NOT NULL;
