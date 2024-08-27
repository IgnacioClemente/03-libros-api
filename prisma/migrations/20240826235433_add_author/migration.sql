-- CreateTable
CREATE TABLE "Author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL DEFAULT 'sin nombre',
    "lastName" TEXT NOT NULL DEFAULT 'sin apellido',
    "nationality" TEXT NOT NULL DEFAULT 'sin nacionalidad',
    "dateOfBirth" INTEGER NOT NULL
);
