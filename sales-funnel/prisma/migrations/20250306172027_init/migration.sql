-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company_name" TEXT NOT NULL,
    "contact_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "lead_source" TEXT NOT NULL,
    "industry" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "deals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lead_id" TEXT NOT NULL,
    "deal_name" TEXT NOT NULL,
    "deal_value" DECIMAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" TEXT NOT NULL,
    "reason_lost" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "deals_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "deal_stages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "deal_id" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "entry_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exit_date" DATETIME,
    CONSTRAINT "deal_stages_deal_id_fkey" FOREIGN KEY ("deal_id") REFERENCES "deals" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "activities" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lead_id" TEXT NOT NULL,
    "deal_id" TEXT,
    "activity_type" TEXT NOT NULL,
    "description" TEXT,
    "activity_date" DATETIME NOT NULL,
    CONSTRAINT "activities_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "activities_deal_id_fkey" FOREIGN KEY ("deal_id") REFERENCES "deals" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
