CREATE SCHEMA `shopping-website`;

CREATE TABLE `shopping-website`.`products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `price` DOUBLE NOT NULL,
  `description` TEXT NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
  
INSERT INTO `shopping-website`.`products` (`title`, `price`, `description`, `image_url`) VALUES ('Greatness Guide', '30', 'Leadership book', 'https://th.bing.com/th/id/OIP._zXfuEA95QhKw8_3pk3INgHaFG?w=265&h=188&c=7&r=0&o=5&pid=1.7');

ALTER TABLE `shopping-website`.`products` RENAME TO  `shopping-website`.`products_mysql2`;

DELETE FROM `shopping-website`.`users`    WHERE (`id` = '1');
DELETE FROM `shopping-website`.`products` WHERE (`id` = '1');

DROP TABLE `shopping-website`.`users`;
ALTER TABLE `shopping-website`.`users` AUTO_INCREMENT = 1;

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255), `email` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
SHOW INDEX FROM `users`
CREATE TABLE IF NOT EXISTS `products` (`id` INTEGER NOT NULL auto_increment , `title` VARCHAR(255) NOT NULL, `price` DOUBLE PRECISION NOT NULL, `image_url` VARCHAR(255) NOT NULL, `description` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;   
SHOW INDEX FROM `products`
DROP TABLE IF EXISTS `carts`;
CREATE TABLE IF NOT EXISTS `carts` (`id` INTEGER NOT NULL auto_increment , `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
SHOW INDEX FROM `carts`
DROP TABLE IF EXISTS `cart_items`;
CREATE TABLE IF NOT EXISTS `cart_items` (`id` INTEGER NOT NULL auto_increment , `quantity` INTEGER, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `cartId` INTEGER, `productId` INTEGER, UNIQUE `cart_items_productId_cartId_unique` (`cartId`, `productId`), PRIMARY KEY (`id`), FOREIGN KEY (`cartId`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
SHOW INDEX FROM `cart_items`
SELECT `id`, `name`, `email`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`id` = 1;
INSERT INTO `users` (`id`,`name`,`email`,`createdAt`,`updatedAt`) VALUES (DEFAULT,?,?,?,?);