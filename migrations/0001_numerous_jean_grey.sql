CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`start_date` text NOT NULL,
	`end_date` text,
	`status` text NOT NULL,
	`imageUrl` text NOT NULL,
	`url` text,
	`created_at` text,
	`updated_at` text
);
