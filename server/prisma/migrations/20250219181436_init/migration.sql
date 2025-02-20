-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fName" TEXT,
    "lName" TEXT,
    "phone" TEXT,
    "pfp" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
