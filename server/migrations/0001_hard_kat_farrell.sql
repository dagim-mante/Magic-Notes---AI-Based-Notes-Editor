CREATE TABLE IF NOT EXISTS "users_to_notes" (
	"user_id" text NOT NULL,
	"note_id" serial NOT NULL,
	CONSTRAINT "users_to_notes_user_id_note_id_pk" PRIMARY KEY("user_id","note_id")
);
--> statement-breakpoint
ALTER TABLE "note" DROP CONSTRAINT "note_owners_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_notes_note_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_notes" ADD CONSTRAINT "users_to_notes_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_notes" ADD CONSTRAINT "users_to_notes_note_id_note_id_fk" FOREIGN KEY ("note_id") REFERENCES "public"."note"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "note" DROP COLUMN IF EXISTS "owners";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "notes";