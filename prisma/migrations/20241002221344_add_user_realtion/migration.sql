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
    "userId" INTEGER,
    CONSTRAINT "Book_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("authorID", "createAt", "id", "image", "publisher", "title", "updatedAt", "year") SELECT "authorID", "createAt", "id", "image", "publisher", "title", "updatedAt", "year" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
