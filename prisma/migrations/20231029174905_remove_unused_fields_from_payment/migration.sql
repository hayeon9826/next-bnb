/*
  Warnings:

  - You are about to drop the column `paymentId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `cardAcquireStatus` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `cardAcquirerCode` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `cardApproveNo` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `cardOwnerType` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "paymentId";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "cardAcquireStatus",
DROP COLUMN "cardAcquirerCode",
DROP COLUMN "cardApproveNo",
DROP COLUMN "cardOwnerType";
