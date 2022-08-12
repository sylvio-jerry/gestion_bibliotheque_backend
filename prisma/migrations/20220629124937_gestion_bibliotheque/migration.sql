-- CreateTable
CREATE TABLE `adhesions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `droit` INTEGER NOT NULL,
    `annee` INTEGER NOT NULL,
    `lecteur_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `lecteur_id`(`lecteur_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `consultations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `livre_id` INTEGER NOT NULL,
    `date_cons` DATE NOT NULL,
    `heure_debut` TIME(0) NOT NULL,
    `heur_fin` TIME(0) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `livre_id`(`livre_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lecteurs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `num_lecteur` VARCHAR(25) NOT NULL,
    `nom_lecteur` VARCHAR(40) NOT NULL,
    `prenom_lecteur` VARCHAR(40) NULL,
    `adresse_lecteur` VARCHAR(40) NOT NULL,
    `telephone` VARCHAR(40) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `livres` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `num_livre` VARCHAR(25) NOT NULL,
    `disponible` BOOLEAN NOT NULL DEFAULT true,
    `nb_pret` INTEGER NOT NULL DEFAULT 0,
    `ouvrage_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk1_OUVRAGE`(`ouvrage_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ouvrages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(40) NOT NULL,
    `auteur` VARCHAR(40) NOT NULL,
    `date_edition` DATE NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `num_pret` VARCHAR(25) NOT NULL,
    `date_pret` DATE NOT NULL,
    `date_retour` DATE NULL,
    `lecteur_id` INTEGER NOT NULL,
    `livre_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `lecteur_id`(`lecteur_id`),
    INDEX `livre_id`(`livre_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullname` VARCHAR(75) NOT NULL,
    `pseudo` VARCHAR(50) NULL,
    `password` VARCHAR(75) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `adhesions` ADD CONSTRAINT `fk1_LECTEUR` FOREIGN KEY (`lecteur_id`) REFERENCES `lecteurs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consultations` ADD CONSTRAINT `fk1_LIVRE` FOREIGN KEY (`livre_id`) REFERENCES `livres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `livres` ADD CONSTRAINT `fk1_OUVRAGE` FOREIGN KEY (`ouvrage_id`) REFERENCES `ouvrages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prets` ADD CONSTRAINT `fk2_LECTEUR` FOREIGN KEY (`lecteur_id`) REFERENCES `lecteurs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prets` ADD CONSTRAINT `fk2_LIVRE` FOREIGN KEY (`livre_id`) REFERENCES `livres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
