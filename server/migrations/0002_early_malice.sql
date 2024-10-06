CREATE TABLE IF NOT EXISTS "note" (
	"id" serial PRIMARY KEY NOT NULL,
	"owners" text NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"created" timestamp DEFAULT now(),
	"updated" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "note" ADD CONSTRAINT "note_owners_user_id_fk" FOREIGN KEY ("owners") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
