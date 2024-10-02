/*
  Warnings:

  - Made the column `userId` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL DEFAULT 'sin titulo',
    "year" INTEGER NOT NULL,
    "publisher" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'sin image',
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorID" INTEGER NOT NULL,
    "updatedAt" DATETIME,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Book_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("authorID", "createAt", "id", "image", "publisher", "title", "updatedAt", "userId", "year") SELECT "authorID", "createAt", "id", "image", "publisher", "title", "updatedAt", "userId", "year" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
