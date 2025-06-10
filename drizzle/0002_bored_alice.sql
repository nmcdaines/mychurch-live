CREATE TABLE `shortcuts` (
	`id` integer PRIMARY KEY NOT NULL,
	`page` integer NOT NULL,
	`slot` integer NOT NULL,
	`command` text NOT NULL,
	`value` text
);
