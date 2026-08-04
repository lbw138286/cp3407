-- CP3407 Smart Expense Tracker Web Application - relational database schema design
-- Designed for MySQL-style relational implementation.

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE expenses (
  expense_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  category_id INT NOT NULL,
  title VARCHAR(150) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  expense_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE monthly_budgets (
  budget_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  budget_month CHAR(7) NOT NULL,
  monthly_limit DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, budget_month),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE budget_alerts (
  alert_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  budget_id INT NOT NULL,
  alert_status ENUM('safe', 'warning', 'over') NOT NULL,
  spent_amount DECIMAL(10,2) NOT NULL,
  alert_message VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (budget_id) REFERENCES monthly_budgets(budget_id)
);

CREATE TABLE system_test_results (
  test_id INT AUTO_INCREMENT PRIMARY KEY,
  user_story_code VARCHAR(20) NOT NULL,
  test_title VARCHAR(150) NOT NULL,
  expected_result TEXT NOT NULL,
  actual_result TEXT,
  status ENUM('pass', 'conditional_pass', 'fail') NOT NULL,
  tested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
