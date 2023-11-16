-- DropForeignKey
ALTER TABLE `numerocomprado` DROP FOREIGN KEY `NumeroComprado_rifaId_fkey`;

-- DropForeignKey
ALTER TABLE `numerocomprado` DROP FOREIGN KEY `NumeroComprado_usuarioCpf_fkey`;

-- DropForeignKey
ALTER TABLE `rifa` DROP FOREIGN KEY `Rifa_CpfUsuario_fkey`;

-- DropForeignKey
ALTER TABLE `rifa` DROP FOREIGN KEY `Rifa_idOng_fkey`;

-- DropForeignKey
ALTER TABLE `trabalho` DROP FOREIGN KEY `Trabalho_idOng_fkey`;

-- DropForeignKey
ALTER TABLE `voluntarios` DROP FOREIGN KEY `Voluntarios_idOng_fkey`;

-- AddForeignKey
ALTER TABLE `Voluntarios` ADD CONSTRAINT `Voluntarios_idOng_fkey` FOREIGN KEY (`idOng`) REFERENCES `Ong`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trabalho` ADD CONSTRAINT `Trabalho_idOng_fkey` FOREIGN KEY (`idOng`) REFERENCES `Ong`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rifa` ADD CONSTRAINT `Rifa_CpfUsuario_fkey` FOREIGN KEY (`CpfUsuario`) REFERENCES `Usuario`(`cpf`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rifa` ADD CONSTRAINT `Rifa_idOng_fkey` FOREIGN KEY (`idOng`) REFERENCES `Ong`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NumeroComprado` ADD CONSTRAINT `NumeroComprado_rifaId_fkey` FOREIGN KEY (`rifaId`) REFERENCES `Rifa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NumeroComprado` ADD CONSTRAINT `NumeroComprado_usuarioCpf_fkey` FOREIGN KEY (`usuarioCpf`) REFERENCES `Usuario`(`cpf`) ON DELETE CASCADE ON UPDATE CASCADE;
