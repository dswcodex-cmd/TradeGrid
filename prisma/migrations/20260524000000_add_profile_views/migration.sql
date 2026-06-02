CREATE TABLE "ProfileView" (
  "profile_view_id" SERIAL PRIMARY KEY,
  "viewed_company_id" INTEGER NOT NULL,
  "viewer_company_id" INTEGER,
  "viewed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "viewer_ip" TEXT,
  "user_agent" TEXT,
  CONSTRAINT "ProfileView_viewed_company_id_fkey"
    FOREIGN KEY ("viewed_company_id") REFERENCES "Company"("company_id")
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "ProfileView_viewer_company_id_fkey"
    FOREIGN KEY ("viewer_company_id") REFERENCES "Company"("company_id")
    ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX "ProfileView_viewed_company_id_viewed_at_idx"
  ON "ProfileView"("viewed_company_id", "viewed_at");

CREATE INDEX "ProfileView_viewer_company_id_viewed_at_idx"
  ON "ProfileView"("viewer_company_id", "viewed_at");
