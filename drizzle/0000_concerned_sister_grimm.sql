CREATE TABLE `access_codes` (
	`code_hash` text PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`scopes_json` text NOT NULL,
	`created_at` text NOT NULL,
	`redeemed_at` text,
	`redeemed_by` text,
	FOREIGN KEY (`redeemed_by`) REFERENCES `users`(`uid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`uid` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text DEFAULT 'Aluno' NOT NULL,
	`plan_complete` integer DEFAULT false NOT NULL,
	`smart_sheets` integer DEFAULT false NOT NULL,
	`assessment_pack` integer DEFAULT false NOT NULL,
	`themed_calendar` integer DEFAULT false NOT NULL,
	`created_at` text NOT NULL,
	`last_login_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);