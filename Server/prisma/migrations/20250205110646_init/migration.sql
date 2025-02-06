-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('PAGE_VIEW', 'PERFORMANCE', 'JS_ERROR', 'CUSTOM');

-- CreateEnum
CREATE TYPE "NetworkType" AS ENUM ('UNKNOWN', 'CELLULAR_3G', 'CELLULAR_4G', 'WIFI');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "event_type" "EventType" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "context_id" TEXT NOT NULL,
    "payload" JSONB NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Context" (
    "id" TEXT NOT NULL,
    "page_url" TEXT NOT NULL,
    "referrer" TEXT,
    "screen_resolution" TEXT,
    "network_type" "NetworkType",
    "user_agent" TEXT NOT NULL,

    CONSTRAINT "Context_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageStatistics" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "page_url" TEXT NOT NULL,
    "pv_count" INTEGER NOT NULL DEFAULT 0,
    "uv_count" INTEGER NOT NULL DEFAULT 0,
    "error_count" INTEGER NOT NULL DEFAULT 0,
    "performance" JSONB NOT NULL,

    CONSTRAINT "PageStatistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ErrorStatistics" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "page_url" TEXT NOT NULL,
    "error_type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "stack" TEXT NOT NULL,
    "user_count" INTEGER NOT NULL DEFAULT 0,
    "occurrence" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ErrorStatistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerformanceStatistics" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "page_url" TEXT NOT NULL,
    "metric_type" TEXT NOT NULL,
    "average_value" DOUBLE PRECISION NOT NULL,
    "max_value" DOUBLE PRECISION NOT NULL,
    "min_value" DOUBLE PRECISION NOT NULL,
    "occurrence" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PerformanceStatistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventUser" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "deviceId" TEXT,
    "browser" TEXT,
    "os" TEXT,

    CONSTRAINT "EventUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatformUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "passwordHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" TIMESTAMP(3),
    "role" "UserRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "PlatformUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlatformUserToProject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PlatformUserToProject_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_event_id_key" ON "Event"("event_id");

-- CreateIndex
CREATE INDEX "Event_timestamp_idx" ON "Event"("timestamp");

-- CreateIndex
CREATE INDEX "Event_event_type_idx" ON "Event"("event_type");

-- CreateIndex
CREATE INDEX "Event_user_id_idx" ON "Event"("user_id");

-- CreateIndex
CREATE INDEX "Context_page_url_idx" ON "Context"("page_url");

-- CreateIndex
CREATE UNIQUE INDEX "Location_ip_key" ON "Location"("ip");

-- CreateIndex
CREATE INDEX "PageStatistics_project_id_idx" ON "PageStatistics"("project_id");

-- CreateIndex
CREATE INDEX "PageStatistics_page_url_idx" ON "PageStatistics"("page_url");

-- CreateIndex
CREATE INDEX "ErrorStatistics_project_id_idx" ON "ErrorStatistics"("project_id");

-- CreateIndex
CREATE INDEX "ErrorStatistics_page_url_idx" ON "ErrorStatistics"("page_url");

-- CreateIndex
CREATE INDEX "ErrorStatistics_error_type_idx" ON "ErrorStatistics"("error_type");

-- CreateIndex
CREATE INDEX "PerformanceStatistics_project_id_idx" ON "PerformanceStatistics"("project_id");

-- CreateIndex
CREATE INDEX "PerformanceStatistics_page_url_idx" ON "PerformanceStatistics"("page_url");

-- CreateIndex
CREATE INDEX "PerformanceStatistics_metric_type_idx" ON "PerformanceStatistics"("metric_type");

-- CreateIndex
CREATE UNIQUE INDEX "PlatformUser_username_key" ON "PlatformUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "PlatformUser_email_key" ON "PlatformUser"("email");

-- CreateIndex
CREATE INDEX "_PlatformUserToProject_B_index" ON "_PlatformUserToProject"("B");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "EventUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_context_id_fkey" FOREIGN KEY ("context_id") REFERENCES "Context"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageStatistics" ADD CONSTRAINT "PageStatistics_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ErrorStatistics" ADD CONSTRAINT "ErrorStatistics_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceStatistics" ADD CONSTRAINT "PerformanceStatistics_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventUser" ADD CONSTRAINT "EventUser_ip_fkey" FOREIGN KEY ("ip") REFERENCES "Location"("ip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlatformUserToProject" ADD CONSTRAINT "_PlatformUserToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "PlatformUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlatformUserToProject" ADD CONSTRAINT "_PlatformUserToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
