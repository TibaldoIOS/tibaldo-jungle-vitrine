CREATE TABLE `flower_quote_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`event_type` text NOT NULL,
	`event_date` text,
	`city` text NOT NULL,
	`fulfillment` text NOT NULL,
	`budget` text,
	`colors` text,
	`flower_slugs` text DEFAULT '' NOT NULL,
	`message` text NOT NULL,
	`consent_at` text NOT NULL,
	`created_at` text NOT NULL
);
