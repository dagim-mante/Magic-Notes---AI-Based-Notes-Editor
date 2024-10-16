DROP TABLE "label";--> statement-breakpoint
ALTER TABLE "note" DROP CONSTRAINT "note_label_label_id_fk";
--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "label" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "label" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "note" ADD COLUMN "label_color" text;