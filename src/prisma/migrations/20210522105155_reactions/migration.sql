-- CreateTable
CREATE TABLE "Reactions" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    PRIMARY KEY ("id","pageId","type")
);

-- AddForeignKey
ALTER TABLE "Reactions" ADD FOREIGN KEY ("pageId") REFERENCES "Pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
