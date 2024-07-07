-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(30) NOT NULL,
    `password` VARCHAR(70) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(10) NOT NULL,
    `sex` VARCHAR(10) NOT NULL,
    `age` INTEGER NOT NULL,
    `user_role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hairStyle` (
    `hairstyle_id` INTEGER NOT NULL AUTO_INCREMENT,
    `hairstyle_name` VARCHAR(50) NOT NULL,
    `hairstyle_price` INTEGER NOT NULL,
    `hairstyle_img` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`hairstyle_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookings` (
    `booking_id` INTEGER NOT NULL AUTO_INCREMENT,
    `datetime` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `hairstyle_id` INTEGER NOT NULL,
    `guest_id` INTEGER NOT NULL,
    `status` ENUM('CANCEL', 'NOT_CANCEL') NOT NULL DEFAULT 'NOT_CANCEL',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Guest` (
    `guest_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(50) NOT NULL,
    `age_range` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`guest_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_hairstyle_id_fkey` FOREIGN KEY (`hairstyle_id`) REFERENCES `hairStyle`(`hairstyle_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_guest_id_fkey` FOREIGN KEY (`guest_id`) REFERENCES `Guest`(`guest_id`) ON DELETE CASCADE ON UPDATE CASCADE;
