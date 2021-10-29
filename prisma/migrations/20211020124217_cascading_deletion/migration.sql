-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "postedById" INTEGER NOT NULL,
    CONSTRAINT "Link_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Link" ("createdAt", "description", "id", "postedById", "url") SELECT "createdAt", "description", "id", "postedById", "url" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
CREATE TABLE "new_Updoot" (
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,

    PRIMARY KEY ("postId", "userId"),
    CONSTRAINT "Updoot_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Link" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Updoot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Updoot" ("postId", "userId", "value") SELECT "postId", "userId", "value" FROM "Updoot";
DROP TABLE "Updoot";
ALTER TABLE "new_Updoot" RENAME TO "Updoot";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
