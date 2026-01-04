CREATE TYPE "public"."oauth_providers" AS ENUM('discord', 'github');--> statement-breakpoint
CREATE TABLE "user_oauth_accounts" (
	"user_id" uuid NOT NULL,
	"provider" varchar NOT NULL,
	"provider_account_id" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_oauth_accounts_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id"),
	CONSTRAINT "user_oauth_accounts_provider_account_id_unique" UNIQUE("provider_account_id")
);
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "unique_emails";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "salt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_oauth_accounts" ADD CONSTRAINT "user_oauth_accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");