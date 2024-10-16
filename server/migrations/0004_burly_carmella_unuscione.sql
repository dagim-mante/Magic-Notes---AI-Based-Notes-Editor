ALTER TABLE "note" ADD COLUMN "label_text" text;--> statement-breakpoint
ALTER TABLE "note" DROP COLUMN IF EXISTS "label";