CREATE TABLE `home` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`age` integer NOT NULL,
	`email` text NOT NULL,
	`profession` text NOT NULL,
	`description` text NOT NULL,
	`address` text NOT NULL,
	`phone` text,
	`urlCurriculum` text NOT NULL,
	`linkedin` text NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `home_email_unique` ON `home` (`email`);