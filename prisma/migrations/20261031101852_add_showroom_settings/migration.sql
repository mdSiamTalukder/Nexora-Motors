-- CreateTable
CREATE TABLE "ShowroomSettings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "showroomName" TEXT NOT NULL DEFAULT 'Nexora Motors',
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "websiteUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShowroomSettings_pkey" PRIMARY KEY ("id")
);
