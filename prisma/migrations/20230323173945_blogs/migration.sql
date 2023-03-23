-- CreateTable
CREATE TABLE "Blogs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "img" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Likes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uid" TEXT NOT NULL,
    "blogsId" INTEGER NOT NULL,
    CONSTRAINT "Likes_blogsId_fkey" FOREIGN KEY ("blogsId") REFERENCES "Blogs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "blogsId" INTEGER NOT NULL,
    CONSTRAINT "Comments_blogsId_fkey" FOREIGN KEY ("blogsId") REFERENCES "Blogs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Likes_uid_key" ON "Likes"("uid");
