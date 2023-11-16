-- CreateTable
CREATE TABLE `NumeroComprado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero` INTEGER NOT NULL,
    `rifaId` INTEGER NOT NULL,
    `usuarioCpf` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NumeroComprado` ADD CONSTRAINT `NumeroComprado_rifaId_fkey` FOREIGN KEY (`rifaId`) REFERENCES `Rifa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NumeroComprado` ADD CONSTRAINT `NumeroComprado_usuarioCpf_fkey` FOREIGN KEY (`usuarioCpf`) REFERENCES `Usuario`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;
