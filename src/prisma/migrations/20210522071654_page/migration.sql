-- CreateTable
CREATE TABLE "Pages" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "hits" INTEGER DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pages.title_unique" ON "Pages"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Pages.slug_unique" ON "Pages"("slug");
