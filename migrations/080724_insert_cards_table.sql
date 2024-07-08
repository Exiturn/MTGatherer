CREATE TABLE `cards` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`lang` text NOT NULL,
	`released_at` numeric NOT NULL,
	`image_uris` text NOT NULL,
	`mana_cost` blob NOT NULL,
	`type_line` text NOT NULL,
	`colours` text NOT NULL,
	`set` text NOT NULL,
	`set_name` text NOT NULL,
	`collector_number` integer NOT NULL,
	`rarity` text NOT NULL,
	`prices` real NOT NULL,
	`purchase_uris` text NOT NULL
);
