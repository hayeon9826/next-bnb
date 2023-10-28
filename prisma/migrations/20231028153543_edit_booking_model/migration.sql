/*
  Warnings:

  - You are about to drop the column `guest` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `guestCount` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "guest",
ADD COLUMN     "guestCount" INTEGER NOT NULL;
