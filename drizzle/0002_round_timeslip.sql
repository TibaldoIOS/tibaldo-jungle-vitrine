CREATE TABLE `conversion_events` (
	`id` text PRIMARY KEY NOT NULL,
	`action` text NOT NULL,
	`path` text NOT NULL,
	`target` text,
	`created_at` text NOT NULL
);
