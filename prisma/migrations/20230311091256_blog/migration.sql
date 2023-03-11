/*
  Warnings:

  - You are about to drop the column `info` on the `Bio` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Bio` table. All the data in the column will be lost.
  - Added the required column `year` to the `Bio` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Skills" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "link" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Works" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "img" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "icon" TEXT
);

-- CreateTable
CREATE TABLE "Stack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "icon" TEXT,
    "worksId" INTEGER NOT NULL,
    CONSTRAINT "Stack_worksId_fkey" FOREIGN KEY ("worksId") REFERENCES "Works" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "likesId" INTEGER NOT NULL,
    "commentsId" INTEGER NOT NULL,
    CONSTRAINT "Blog_likesId_fkey" FOREIGN KEY ("likesId") REFERENCES "Likes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Blog_commentsId_fkey" FOREIGN KEY ("commentsId") REFERENCES "Comments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "comment" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Likes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uniqueId" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" DATETIME NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Bio" ("description", "id") SELECT "description", "id" FROM "Bio";
DROP TABLE "Bio";
ALTER TABLE "new_Bio" RENAME TO "Bio";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
