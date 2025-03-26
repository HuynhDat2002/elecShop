/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderLineItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `OrderLineItems` DROP FOREIGN KEY `OrderLineItems_orderId_fkey`;

-- DropTable
DROP TABLE `Order`;

-- DropTable
DROP TABLE `OrderLineItems`;
