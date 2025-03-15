/*
  Warnings:

  - You are about to drop the column `event_id` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `deviceId` on the `EventUser` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `PlatformUser` table. All the data in the column will be lost.
  - You are about to drop the column `lastLogin` on the `PlatformUser` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `PlatformUser` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Event_event_id_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "event_id";

-- AlterTable
ALTER TABLE "EventUser" DROP COLUMN "deviceId",
ADD COLUMN     "device_id" TEXT;

-- AlterTable
ALTER TABLE "PlatformUser" DROP COLUMN "createdAt",
DROP COLUMN "lastLogin",
DROP COLUMN "passwordHash",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "last_login" TIMESTAMP(3),
ADD COLUMN     "password_hash" TEXT;
