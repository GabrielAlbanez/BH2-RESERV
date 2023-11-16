-- DropForeignKey
ALTER TABLE `rifa` DROP FOREIGN KEY `Rifa_CpfUsuario_fkey`;

-- AlterTable
ALTER TABLE `rifa` MODIFY `CpfUsuario` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Rifa` ADD CONSTRAINT `Rifa_CpfUsuario_fkey` FOREIGN KEY (`CpfUsuario`) REFERENCES `Usuario`(`cpf`) ON DELETE SET NULL ON UPDATE CASCADE;
