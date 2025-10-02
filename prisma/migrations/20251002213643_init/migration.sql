-- CreateTable
CREATE TABLE `participant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `age_group_id` INTEGER NOT NULL,
    `formation_id` INTEGER NULL,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `nickname` VARCHAR(100) NOT NULL,
    `year_of_birth` YEAR NOT NULL,
    `email` VARCHAR(255) NULL,
    `token` VARCHAR(255) NULL,
    `phone` VARCHAR(20) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    INDEX `idx_participant_age_group_id`(`age_group_id`),
    INDEX `idx_participant_formation_id`(`formation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `competition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `starts_at` TIMESTAMP(0) NOT NULL,
    `is_active` BOOLEAN NULL DEFAULT false,
    `is_registration_open` BOOLEAN NULL DEFAULT false,
    `is_running` BOOLEAN NULL DEFAULT false,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `age_group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `seats` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `formation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `age_group_id` INTEGER NOT NULL,
    `coach_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `choreographer` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_formation_age_group_id`(`age_group_id`),
    INDEX `idx_formation_coach_id`(`coach_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coach` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `club_name` VARCHAR(100) NOT NULL,
    `year_of_birth` YEAR NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `participant` ADD CONSTRAINT `fk_participant_age_group` FOREIGN KEY (`age_group_id`) REFERENCES `age_group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participant` ADD CONSTRAINT `fk_participant_formation` FOREIGN KEY (`formation_id`) REFERENCES `formation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `formation` ADD CONSTRAINT `fk_formation_age_group` FOREIGN KEY (`age_group_id`) REFERENCES `age_group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `formation` ADD CONSTRAINT `fk_formation_coach` FOREIGN KEY (`coach_id`) REFERENCES `coach`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
