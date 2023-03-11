/*
  Warnings:

  - You are about to drop the column `commentsId` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `likesId` on the `Blog` table. All the data in the column will be lost.
  - Added the required column `blogId` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blogID` to the `Likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blogId` to the `Likes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "blogId" INTEGER NOT NULL,
    CONSTRAINT "Comments_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comments" ("comment", "email", "id") SELECT "comment", "email", "id" FROM "Comments";
DROP TABLE "Comments";
ALTER TABLE "new_Comments" RENAME TO "Comments";
CREATE TABLE "new_Blog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL
);
INSERT INTO "new_Blog" ("content", "id", "title") SELECT "content", "id", "title" FROM "Blog";
DROP TABLE "Blog";
ALTER TABLE "new_Blog" RENAME TO "Blog";
CREATE TABLE "new_Likes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uniqueId" TEXT NOT NULL,
    "blogID" INTEGER NOT NULL,
    "blogId" INTEGER NOT NULL,
    CONSTRAINT "Likes_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Likes" ("id", "uniqueId") SELECT "id", "uniqueId" FROM "Likes";
DROP TABLE "Likes";
ALTER TABLE "new_Likes" RENAME TO "Likes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
