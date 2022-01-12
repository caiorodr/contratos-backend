-- CreateTable
CREATE TABLE `Contrato` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `diretor` VARCHAR(191) NOT NULL,
    `gerente` VARCHAR(191) NOT NULL,
    `supervisor` VARCHAR(191) NOT NULL,
    `cr` INTEGER NOT NULL,
    `dataInicio` VARCHAR(191) NOT NULL,
    `dataFim` VARCHAR(191) NOT NULL,
    `documento` VARCHAR(191) NOT NULL,
    `natureza` VARCHAR(191) NOT NULL,
    `cliente` VARCHAR(191) NOT NULL,
    `empresa` VARCHAR(191) NOT NULL,
    `negocio` VARCHAR(191) NOT NULL,
    `reajuste` VARCHAR(191) NOT NULL,
    `faturamento` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `lgpd` BOOLEAN NOT NULL,
    `valor` DECIMAL(9, 2) NOT NULL,
    `docContrato` VARCHAR(60000) NULL,

    UNIQUE INDEX `Contrato_documento_key`(`documento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aditivo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `diretor` VARCHAR(191) NOT NULL,
    `gerente` VARCHAR(191) NOT NULL,
    `supervisor` VARCHAR(191) NOT NULL,
    `cr` INTEGER NOT NULL,
    `dataInicio` VARCHAR(191) NOT NULL,
    `dataFim` VARCHAR(191) NOT NULL,
    `natureza` VARCHAR(191) NOT NULL,
    `cliente` VARCHAR(191) NOT NULL,
    `empresa` VARCHAR(191) NOT NULL,
    `negocio` VARCHAR(191) NOT NULL,
    `reajuste` VARCHAR(191) NOT NULL,
    `faturamento` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `lgpd` BOOLEAN NOT NULL,
    `valor` DECIMAL(9, 2) NOT NULL,
    `docAditivo` VARCHAR(60000) NULL,
    `numDocumento` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Aditivo` ADD CONSTRAINT `Aditivo_numDocumento_fkey` FOREIGN KEY (`numDocumento`) REFERENCES `Contrato`(`documento`) ON DELETE RESTRICT ON UPDATE CASCADE;
