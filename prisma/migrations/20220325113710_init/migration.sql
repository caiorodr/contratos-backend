-- CreateTable
CREATE TABLE `CONTRATO` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataInicio` VARCHAR(191) NOT NULL,
    `dataFim` VARCHAR(191) NOT NULL,
    `documento` VARCHAR(191) NOT NULL,
    `natureza` VARCHAR(191) NOT NULL,
    `pec` VARCHAR(191) NOT NULL,
    `grupoCliente` VARCHAR(191) NOT NULL,
    `empresa` VARCHAR(1200) NOT NULL,
    `negocio` VARCHAR(191) NOT NULL,
    `docSolid` VARCHAR(1200) NOT NULL,
    `retencaoContrato` VARCHAR(191) NOT NULL,
    `faturamento` VARCHAR(191) NOT NULL,
    `seguros` VARCHAR(191) NOT NULL,
    `reajuste` VARCHAR(191) NOT NULL,
    `mesReajuste` VARCHAR(191) NOT NULL,
    `tipoAss` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `chamado` VARCHAR(191) NOT NULL,
    `resumo` VARCHAR(191) NULL,
    `lgpd` BOOLEAN NOT NULL,
    `limiteResponsabilidade` BOOLEAN NOT NULL,
    `valor` DECIMAL(11, 2) NOT NULL,
    `D_E_L_E_T_` VARCHAR(191) NULL DEFAULT '',

    UNIQUE INDEX `CONTRATO_documento_key`(`documento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ADITIVO` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `diretor` VARCHAR(191) NOT NULL,
    `gerente` VARCHAR(191) NOT NULL,
    `supervisor` VARCHAR(191) NOT NULL,
    `pec` VARCHAR(191) NOT NULL,
    `cr` VARCHAR(191) NOT NULL,
    `dataInicio` VARCHAR(191) NOT NULL,
    `dataFim` VARCHAR(191) NOT NULL,
    `natureza` VARCHAR(191) NOT NULL,
    `grupoCliente` VARCHAR(191) NOT NULL,
    `empresa` VARCHAR(191) NOT NULL,
    `negocio` VARCHAR(191) NOT NULL,
    `docSolid` VARCHAR(191) NOT NULL,
    `retencaoContrato` VARCHAR(191) NOT NULL,
    `faturamento` VARCHAR(191) NOT NULL,
    `reajuste` VARCHAR(191) NOT NULL,
    `mesReajuste` VARCHAR(191) NOT NULL,
    `tipoAss` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `lgpd` BOOLEAN NOT NULL,
    `limiteResponsabilidade` BOOLEAN NOT NULL,
    `valor` DECIMAL(11, 2) NOT NULL,
    `numDocumento` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DADOS_ARQUIVO` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `originalName` VARCHAR(191) NOT NULL,
    `mediaName` VARCHAR(191) NOT NULL,
    `contentType` VARCHAR(191) NOT NULL,
    `contratoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CENTRO_CUSTO` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cr` VARCHAR(191) NOT NULL,
    `descricaoCr` VARCHAR(191) NOT NULL,
    `pecCr` VARCHAR(191) NOT NULL,
    `descricaoPecCr` VARCHAR(191) NOT NULL,
    `regionalCr` VARCHAR(191) NOT NULL,
    `supervisorCr` VARCHAR(191) NOT NULL,
    `gerenteCr` VARCHAR(191) NOT NULL,
    `diretorCr` VARCHAR(191) NOT NULL,
    `diretorExecCr` VARCHAR(191) NOT NULL,
    `gerenteRegCr` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CENTRO_CUSTO_cr_key`(`cr`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CR_CONTRATO` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pecCr` VARCHAR(191) NULL,
    `descricaoPecCr` VARCHAR(191) NULL,
    `cr` VARCHAR(191) NULL,
    `descricaoCr` VARCHAR(191) NULL,
    `regionalCr` VARCHAR(191) NULL,
    `diretorCr` VARCHAR(191) NULL,
    `diretorExecCr` VARCHAR(191) NULL,
    `gerenteRegCr` VARCHAR(191) NULL,
    `gerenteCr` VARCHAR(191) NULL,
    `supervisorCr` VARCHAR(191) NULL,
    `valorCr` DECIMAL(11, 2) NULL,
    `numContratoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ADITIVO` ADD CONSTRAINT `ADITIVO_numDocumento_fkey` FOREIGN KEY (`numDocumento`) REFERENCES `CONTRATO`(`documento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DADOS_ARQUIVO` ADD CONSTRAINT `DADOS_ARQUIVO_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `CONTRATO`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CR_CONTRATO` ADD CONSTRAINT `CR_CONTRATO_numContratoId_fkey` FOREIGN KEY (`numContratoId`) REFERENCES `CONTRATO`(`documento`) ON DELETE RESTRICT ON UPDATE CASCADE;
