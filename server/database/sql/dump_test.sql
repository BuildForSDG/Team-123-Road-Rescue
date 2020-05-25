

# Crop
DROP DATABASE IF EXISTS road_rescue_test;


# Create DB
CREATE DATABASE IF NOT EXISTS `road_rescue_test` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `road_rescue_test`;


-- Create user table
CREATE TABLE `user` (
  `user_id`            INT           NOT NULL AUTO_INCREMENT,
  `name`               VARCHAR(50)   NOT NULL,
  `email`              VARCHAR(100)  NOT NULL,
  `password`           VARCHAR(100)   NOT NULL,
  `address`          VARCHAR(150),
  `city`               VARCHAR(100),
  `postal_code`        VARCHAR(20),
  `state`             VARCHAR(100),
  `mob_phone`          VARCHAR(100),
  `activate`            VARCHAR(10),
  PRIMARY KEY  (`user_id`),
  UNIQUE KEY `idx_customer_email` (`email`)
) ENGINE=MyISAM;

-- Create crash table
CREATE TABLE `crash_report` (
  `crash_id`         INT      NOT NULL  AUTO_INCREMENT,
  `name`             VARCHAR(100)  NOT NULL,
  `user_id`          INT      NOT NULL,
  `number_victims`   INT (11) NOT NULL,
  `location`         VARCHAR(150) NOT NULL,
  `image`            VARCHAR(200),
  `video`            VARCHAR(200),
  `massage`        VARCHAR(1000),
  PRIMARY KEY  (`crash_id`),
  FULLTEXT KEY `idx_ft_crash_message` (`message`),
  KEY `idx_crash_user_id` (`user_id`),
) ENGINE=MyISAM;


-- Create contact us table
CREATE TABLE `contactus` (
  `message_id`       INT      NOT NULL  AUTO_INCREMENT,
  `message`             VARCHAR(10000),
  `user_id`   INT (11) NOT NULL,
  PRIMARY KEY  (`message_id`),
  FULLTEXT KEY `idx_ft_message` (`message`),
  KEY `idx_messages_user_id` (`user_id`),
) ENGINE=MyISAM;


