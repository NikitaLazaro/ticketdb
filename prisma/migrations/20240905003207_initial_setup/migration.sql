-- CreateTable
CREATE TABLE `Ticket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `status` ENUM('Abierto', 'Empezado', 'Cerrado') NOT NULL DEFAULT 'Abierto',
    `priority` ENUM('Baja', 'Media', 'Alta') NOT NULL DEFAULT 'Media',
    `empresas` ENUM('Voeral_Energies', 'Estudener_Energias_Renovables', 'DB_Holding', 'Nodus', 'Sycba', 'La_Monumental') NOT NULL DEFAULT 'DB_Holding',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
