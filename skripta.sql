SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema news_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `news_db` DEFAULT CHARACTER SET utf8;
USE `news_db`;

-- -----------------------------------------------------
-- Table `news_db`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `news_db`.`comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `news_id` INT NOT NULL,
  `user` VARCHAR(45) NOT NULL,
  `content` TEXT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `parent_comment_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `parent_comment_id_idx` (`parent_comment_id` ASC) VISIBLE,
  CONSTRAINT `parent_comment_id`
    FOREIGN KEY (`parent_comment_id`)
    REFERENCES `news_db`.`comment` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `news_db`.`statistic`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `news_db`.`statistic` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `access_date` DATETIME NOT NULL,
  `ip_address` VARCHAR(45) NOT NULL,
  `browser_name` VARCHAR(45) NOT NULL,
  `os_name` VARCHAR(45) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `section_name` VARCHAR(45) NOT NULL,
  `subsection_name` VARCHAR(45) NOT NULL,
  `news_title` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- View `news_db`.`statisticlast7days`
-- -----------------------------------------------------
CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `news_db`.`statisticlast7days` AS 
SELECT 
    ROW_NUMBER() OVER (ORDER BY `aggregated_data`.`attribute`, `aggregated_data`.`value`) AS `id`, 
    `aggregated_data`.`attribute` AS `attribute`, 
    `aggregated_data`.`value` AS `value`, 
    `aggregated_data`.`total_visits` AS `total_visits` 
FROM 
    (SELECT 
        'IP adresa posjetioca' AS `attribute`, 
        `news_db`.`statistic`.`ip_address` AS `value`, 
        COUNT(0) AS `total_visits` 
     FROM 
        `news_db`.`statistic` 
     WHERE 
        (`news_db`.`statistic`.`access_date` >= (NOW() - INTERVAL 7 DAY)) 
     GROUP BY `news_db`.`statistic`.`ip_address` 
     UNION ALL 
     SELECT 
        'Naziv browser-a posjetioca' AS `attribute`, 
        `news_db`.`statistic`.`browser_name` AS `value`, 
        COUNT(0) AS `total_visits` 
     FROM 
        `news_db`.`statistic` 
     WHERE 
        (`news_db`.`statistic`.`access_date` >= (NOW() - INTERVAL 7 DAY)) 
     GROUP BY `news_db`.`statistic`.`browser_name` 
     UNION ALL 
     SELECT 
        'Operativni sistem' AS `attribute`, 
        `news_db`.`statistic`.`os_name` AS `value`, 
        COUNT(0) AS `total_visits` 
     FROM 
        `news_db`.`statistic` 
     WHERE 
        (`news_db`.`statistic`.`access_date` >= (NOW() - INTERVAL 7 DAY)) 
     GROUP BY `news_db`.`statistic`.`os_name` 
     UNION ALL 
     SELECT 
        'Država' AS `attribute`, 
        `news_db`.`statistic`.`country` AS `value`, 
        COUNT(0) AS `total_visits` 
     FROM 
        `news_db`.`statistic` 
     WHERE 
        (`news_db`.`statistic`.`access_date` >= (NOW() - INTERVAL 7 DAY)) 
     GROUP BY `news_db`.`statistic`.`country` 
     UNION ALL 
     SELECT 
        'Grad' AS `attribute`, 
        `news_db`.`statistic`.`city` AS `value`, 
        COUNT(0) AS `total_visits` 
     FROM 
        `news_db`.`statistic` 
     WHERE 
        (`news_db`.`statistic`.`access_date` >= (NOW() - INTERVAL 7 DAY)) 
     GROUP BY `news_db`.`statistic`.`city` 
     UNION ALL 
     SELECT 
        'Naziv rubrike' AS `attribute`, 
        `news_db`.`statistic`.`section_name` AS `value`, 
        COUNT(0) AS `total_visits` 
     FROM 
        `news_db`.`statistic` 
     WHERE 
        (`news_db`.`statistic`.`access_date` >= (NOW() - INTERVAL 7 DAY)) 
     GROUP BY `news_db`.`statistic`.`section_name` 
     UNION ALL 
     SELECT 
        'Naziv podrubrike' AS `attribute`, 
        `news_db`.`statistic`.`subsection_name` AS `value`, 
        COUNT(0) AS `total_visits` 
     FROM 
        `news_db`.`statistic` 
     WHERE 
        (`news_db`.`statistic`.`access_date` >= (NOW() - INTERVAL 7 DAY)) 
     GROUP BY `news_db`.`statistic`.`subsection_name` 
     UNION ALL 
     SELECT 
        'Naziv vijesti' AS `attribute`, 
        `news_db`.`statistic`.`news_title` AS `value`, 
        COUNT(0) AS `total_visits` 
     FROM 
        `news_db`.`statistic` 
     WHERE 
        ((`news_db`.`statistic`.`access_date` >= (NOW() - INTERVAL 7 DAY)) 
         AND (`news_db`.`statistic`.`news_title` IS NOT NULL)) 
     GROUP BY `news_db`.`statistic`.`news_title`
    ) `aggregated_data`;

-- -----------------------------------------------------
-- View `news_db`.`topcomments`
-- -----------------------------------------------------
CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `news_db`.`topcomments` AS 
    SELECT 
        `news_db`.`comment`.`news_id` AS `news_id`, 
        COUNT(0) AS `total_comments` 
    FROM 
        `news_db`.`comment` 
    GROUP BY `news_db`.`comment`.`news_id`;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
