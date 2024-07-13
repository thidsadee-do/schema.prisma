/*
  Warnings:

  - You are about to alter the column `status` on the `bookings` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Int`.

*/
-- AlterTable
ALTER TABLE `bookings` MODIFY `status` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `users` MODIFY `age` VARCHAR(191) NOT NULL;
