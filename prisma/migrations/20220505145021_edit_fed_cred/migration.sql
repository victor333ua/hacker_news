/*
  Warnings:

  - You are about to drop the column `providerId` on the `FederatedCredential` table. All the data in the column will be lost.
  - Added the required column `socialId` to the `FederatedCredential` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FederatedCredential" (
    "userId" INTEGER NOT NULL,
    "provider" TEXT NOT NULL,
    "socialId" TEXT NOT NULL,

    PRIMARY KEY ("provider", "socialId"),
    CONSTRAINT "FederatedCredential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FederatedCredential" ("provider", "userId") SELECT "provider", "userId" FROM "FederatedCredential";
DROP TABLE "FederatedCredential";
ALTER TABLE "new_FederatedCredential" RENAME TO "FederatedCredential";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
