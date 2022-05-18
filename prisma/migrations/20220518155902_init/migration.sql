-- CreateTable
CREATE TABLE `CONTRATO` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataInicio` VARCHAR(191) NULL,
    `dataFim` VARCHAR(191) NULL,
    `documento` VARCHAR(191) NOT NULL,
    `natureza` VARCHAR(191) NOT NULL DEFAULT '',
    `pec` VARCHAR(191) NOT NULL DEFAULT '',
    `descricaoPec` VARCHAR(191) NOT NULL DEFAULT '',
    `grupoCliente` VARCHAR(191) NOT NULL DEFAULT '',
    `empresa` VARCHAR(1200) NOT NULL DEFAULT '',
    `negocio` VARCHAR(191) NOT NULL DEFAULT '',
    `docSolid` VARCHAR(1200) NOT NULL DEFAULT '',
    `retencaoContrato` VARCHAR(191) NOT NULL DEFAULT '',
    `faturamento` VARCHAR(191) NOT NULL DEFAULT '',
    `seguros` VARCHAR(191) NOT NULL DEFAULT '',
    `tipoFaturamento` VARCHAR(191) NOT NULL DEFAULT '',
    `reajuste1` VARCHAR(191) NOT NULL DEFAULT '',
    `mesReajuste1` VARCHAR(191) NOT NULL DEFAULT '',
    `reajuste2` VARCHAR(191) NOT NULL DEFAULT '',
    `mesReajuste2` VARCHAR(191) NOT NULL DEFAULT '',
    `reajuste3` VARCHAR(191) NOT NULL DEFAULT '',
    `mesReajuste3` VARCHAR(191) NOT NULL DEFAULT '',
    `tipoAss` VARCHAR(191) NOT NULL DEFAULT '',
    `status` VARCHAR(191) NOT NULL DEFAULT '',
    `statusPec` INTEGER NULL,
    `resumo` VARCHAR(191) NOT NULL DEFAULT '',
    `lgpd` BOOLEAN NOT NULL DEFAULT false,
    `limiteResponsabilidade` BOOLEAN NOT NULL DEFAULT false,
    `valor` DECIMAL(15, 2) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `updatedJuridico` DATETIME(3) NULL,
    `valorComparar` DECIMAL(15, 2) NULL,
    `reajusteComparar1` VARCHAR(191) NOT NULL DEFAULT '',
    `mesReajusteComparar1` VARCHAR(191) NOT NULL DEFAULT '',
    `reajusteComparar2` VARCHAR(191) NOT NULL DEFAULT '',
    `mesReajusteComparar2` VARCHAR(191) NOT NULL DEFAULT '',
    `reajusteComparar3` VARCHAR(191) NOT NULL DEFAULT '',
    `mesReajusteComparar3` VARCHAR(191) NOT NULL DEFAULT '',
    `dataInicioComparar` VARCHAR(191) NOT NULL DEFAULT '',
    `dataFimComparar` VARCHAR(191) NOT NULL DEFAULT '',
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `CONTRATO_documento_key`(`documento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DADOS_ARQUIVO` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `originalName` VARCHAR(191) NOT NULL,
    `mediaName` VARCHAR(191) NOT NULL,
    `contentType` VARCHAR(191) NOT NULL,
    `sizeFile` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `contratoId` INTEGER NOT NULL,

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
    `valorCr` DECIMAL(15, 2) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `numContratoId` VARCHAR(191) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PEC_CONTRATO` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pecCr` VARCHAR(191) NULL,
    `descricaoPec` VARCHAR(191) NULL,
    `grupoClienteId` VARCHAR(191) NULL,
    `grupoCliente` VARCHAR(191) NULL,
    `dataInicio` VARCHAR(191) NULL,
    `dataFim` VARCHAR(191) NULL,
    `negocioId` VARCHAR(191) NULL,
    `negocio` VARCHAR(191) NULL,
    `cr` VARCHAR(191) NULL,
    `descricaoCr` VARCHAR(191) NULL,
    `regionalCr` VARCHAR(191) NULL,
    `diretorCr` VARCHAR(191) NULL,
    `diretorExecCr` VARCHAR(191) NULL,
    `gerenteRegCr` VARCHAR(191) NULL,
    `gerenteCr` VARCHAR(191) NULL,
    `supervisorCr` VARCHAR(191) NULL,
    `empresaId` VARCHAR(191) NULL,
    `mesReajuste1` VARCHAR(191) NULL,
    `indiceReajuste1` VARCHAR(191) NULL,
    `mesReajuste2` VARCHAR(191) NULL,
    `indiceReajuste2` VARCHAR(191) NULL,
    `mesReajuste3` VARCHAR(191) NULL,
    `indiceReajuste3` VARCHAR(191) NULL,
    `empresa` VARCHAR(1200) NULL,
    `status` INTEGER NULL,
    `valorCr` DECIMAL(15, 2) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LOG_JOB` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `infoLog` LONGTEXT NOT NULL,
    `dataInicio` DATETIME(3) NULL,
    `dataFim` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SEGUROS` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DOC_SOLIDARIA` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RETENC_CONTRATUAL` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TIPO_FATURAMENTO` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TIPO_ASS` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `REAJUSTE` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DADOS_ARQUIVO` ADD CONSTRAINT `DADOS_ARQUIVO_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `CONTRATO`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CR_CONTRATO` ADD CONSTRAINT `CR_CONTRATO_numContratoId_fkey` FOREIGN KEY (`numContratoId`) REFERENCES `CONTRATO`(`documento`) ON DELETE RESTRICT ON UPDATE CASCADE;
