-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('READY', 'IN_PROGRESS', 'WAITING_FOR_DEPOSIT', 'DONE', 'CANCELED', 'PARTIAL_CANCELED', 'ABORTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('NORMAL', 'BILLING', 'BRANDPAY');

-- CreateEnum
CREATE TYPE "CardAcquireStatus" AS ENUM ('READY', 'REQUESTED', 'COMPLETED', 'CANCEL_REQUESTED', 'CANCELED');

-- AlterEnum
ALTER TYPE "BookingStatus" ADD VALUE 'FAILED';

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "paymentId" INTEGER;

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "paymentKey" TEXT NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "type" "PaymentType" NOT NULL,
    "orderId" TEXT NOT NULL,
    "orderName" TEXT,
    "mId" TEXT,
    "method" TEXT,
    "totalAmnount" INTEGER NOT NULL,
    "approvedAt" TEXT,
    "requestedAt" TEXT,
    "cardNumber" TEXT,
    "cardAcquirerCode" TEXT,
    "cardApproveNo" TEXT,
    "cardType" TEXT,
    "cardOwnerType" TEXT,
    "cardAcquireStatus" "CardAcquireStatus",
    "receiptUrl" TEXT NOT NULL,
    "checkoutUrl" TEXT NOT NULL,
    "failureCode" TEXT,
    "failureMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
