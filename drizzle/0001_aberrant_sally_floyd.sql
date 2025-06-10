CREATE TABLE `macros` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`steps` text DEFAULT '[]',
	`deviceId` integer,
	`type` text,
	FOREIGN KEY (`deviceId`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action
);
