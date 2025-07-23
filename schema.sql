-- MtaaNet Database Schema
-- This script creates the database and tables for the MtaaNet application.

-- 1. Create the Database
CREATE DATABASE IF NOT EXISTS mtaanet_db;
USE mtaanet_db;

-- 2. Users Table
-- Stores user account information for authentication and profile management.
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `phone_number` VARCHAR(20) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Plans Table
-- Stores the available internet plans that users can subscribe to.
CREATE TABLE IF NOT EXISTS `plans` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `period` VARCHAR(50) NOT NULL COMMENT 'e.g., day, week, month',
  `description` TEXT,
  `data_allowance_gb` DECIMAL(10, 2) COMMENT 'Data allowance in GB. NULL for unlimited.',
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Subscriptions Table
-- Tracks which user is subscribed to which plan.
CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `plan_id` INT NOT NULL,
  `starts_at` TIMESTAMP NOT NULL,
  `expires_at` TIMESTAMP NOT NULL,
  `data_usage_gb` DECIMAL(10, 2) DEFAULT 0.00,
  `is_active` BOOLEAN GENERATED ALWAYS AS (expires_at > CURRENT_TIMESTAMP) STORED,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON DELETE RESTRICT
);

-- 5. Payments Table
-- Stores a history of all payment transactions.
CREATE TABLE IF NOT EXISTS `payments` (
  `id` VARCHAR(255) PRIMARY KEY COMMENT 'Invoice ID or transaction ID',
  `user_id` INT NOT NULL,
  `subscription_id` INT,
  `amount` DECIMAL(10, 2) NOT NULL,
  `currency` VARCHAR(10) NOT NULL DEFAULT 'KES',
  `status` ENUM('Pending', 'Paid', 'Failed') NOT NULL,
  `payment_method` VARCHAR(50),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
  FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions`(`id`)
);

-- 6. Hotspot_Suggestions Table
-- Optional: Stores the results from the AI Hotspot Optimizer for admins.
CREATE TABLE IF NOT EXISTS `hotspot_suggestions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `suggested_locations` TEXT NOT NULL,
  `reasoning` TEXT NOT NULL,
  `input_payload` JSON COMMENT 'Stores the JSON input that generated the suggestion',
  `created_by_admin_id` INT, -- If you add an admin users table
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- --- Sample Data Insertion ---
-- You can uncomment this section to populate your tables with initial data.

-- INSERT INTO `plans` (`title`, `price`, `period`, `description`, `data_allowance_gb`) VALUES
-- ('Hourly Pass', 20.00, '2 hrs', 'Perfect for quick tasks and browsing.', NULL),
-- ('Daily Pass', 50.00, 'day', 'All-day access for work or entertainment.', 5.00),
-- ('Weekly Pass', 300.00, 'week', 'A full week of uninterrupted connectivity.', 25.00),
-- ('Monthly Pass', 1000.00, 'month', 'Best value for long-term users.', NULL); -- NULL for unlimited

-- --- Indexes for Performance ---
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_user_phone ON users(phone_number);
CREATE INDEX idx_sub_user_id ON subscriptions(user_id);
CREATE INDEX idx_sub_expires_at ON subscriptions(expires_at);
CREATE INDEX idx_payment_user_id ON payments(user_id);
