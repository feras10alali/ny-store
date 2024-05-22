CREATE TABLE `order` (
	`stripe_order_id` varchar(100) NOT NULL,
	`stripe_customer_id` varchar(100),
	`total_price` int NOT NULL,
	`timestamp` timestamp NOT NULL,
	`status` enum('new','placed','packaged','sent') NOT NULL DEFAULT 'new',
	CONSTRAINT `order_stripe_order_id` PRIMARY KEY(`stripe_order_id`)
);
--> statement-breakpoint
CREATE TABLE `order_product` (
	`id` varchar(20) NOT NULL,
	`product_size_code` varchar(100) NOT NULL,
	`quantity` int NOT NULL,
	`order_id` varchar(100) NOT NULL,
	CONSTRAINT `order_product_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` varchar(100) NOT NULL,
	`name` varchar(100) NOT NULL,
	`desc` text NOT NULL,
	`gradient_color_start` varchar(20) NOT NULL DEFAULT 'from-red-600',
	`gradient_color_via` varchar(20) NOT NULL DEFAULT 'via-purple-500',
	`gradient_color_end` varchar(20) NOT NULL DEFAULT 'to-indigo-400',
	CONSTRAINT `product_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_image` (
	`cloudinary_id` varchar(255) NOT NULL,
	`product_id` varchar(100) NOT NULL,
	`width` int NOT NULL,
	`height` int NOT NULL,
	`is_vertical` boolean NOT NULL DEFAULT false,
	`order` int NOT NULL DEFAULT 0,
	`is_primary` boolean NOT NULL DEFAULT false,
	CONSTRAINT `product_image_cloudinary_id` PRIMARY KEY(`cloudinary_id`)
);
--> statement-breakpoint
CREATE TABLE `product_review` (
	`id` varchar(100) NOT NULL,
	`rating` int NOT NULL,
	`review_text` text,
	`product_id` varchar(100),
	`timestamp` timestamp,
	CONSTRAINT `product_review_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_size` (
	`code` varchar(100) NOT NULL,
	`name` varchar(255) NOT NULL DEFAULT 'my product',
	`is_available` boolean NOT NULL DEFAULT true,
	`width` int NOT NULL,
	`height` int NOT NULL,
	`price` int NOT NULL,
	`stripe_price_id` varchar(100) NOT NULL,
	`stripe_product_id` varchar(100) NOT NULL,
	`product_id` varchar(100) NOT NULL,
	CONSTRAINT `product_size_code` PRIMARY KEY(`code`)
);
--> statement-breakpoint
CREATE TABLE `product_tag` (
	`name` varchar(100) NOT NULL,
	`desc` text NOT NULL,
	CONSTRAINT `product_tag_name` PRIMARY KEY(`name`)
);
--> statement-breakpoint
CREATE TABLE `product_to_product_tag` (
	`product_id` varchar(100) NOT NULL,
	`tag_id` varchar(100) NOT NULL,
	CONSTRAINT `product_to_product_tag_product_id_tag_id_pk` PRIMARY KEY(`product_id`,`tag_id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(100) NOT NULL,
	`hashed_password` varchar(255) NOT NULL,
	`is_admin` boolean NOT NULL DEFAULT false,
	`email` varchar(100) NOT NULL,
	`stripe_customer_id` varchar(100),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`),
	CONSTRAINT `user_stripe_customer_id_unique` UNIQUE(`stripe_customer_id`)
);
--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;