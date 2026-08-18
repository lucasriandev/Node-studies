-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Personagem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "poder" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Personagem" ("id", "nome", "poder", "criadoEm")
SELECT "id", "texto", '', "criadoEm" FROM "Personagem";
DROP TABLE "Personagem";
ALTER TABLE "new_Personagem" RENAME TO "Personagem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
