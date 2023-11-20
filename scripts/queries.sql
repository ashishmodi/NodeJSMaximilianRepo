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

ALTER TABLE `shopping-website`.`products` RENAME TO  `shopping-website`.`products_mysql2` ;