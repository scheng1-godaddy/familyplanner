DROP DATABASE IF EXISTS planner;
CREATE DATABASE planner;

\c planner;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  password VARCHAR(255),
  email VARCHAR(100),
  family_id INT
);

CREATE TABLE family (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE appointment (
  id SERIAL PRIMARY KEY,
  start_datetime TIMESTAMP,
  end_datetime TIMESTAMP,
  name VARCHAR(255),
  description TEXT,
  location VARCHAR(255),
  creator_id INT,
  family_id INT,
  category_id INT,
  recurring VARCHAR(255),
  is_recurring BOOLEAN
);

CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  family_id INT,
  color_id INT
);

CREATE TABLE colors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  value VARCHAR(255)
);

INSERT INTO colors (name, value) VALUES ('Green', 'A8FF9C');
INSERT INTO colors (name, value) VALUES ('Blue', '5A9DE8');
INSERT INTO colors (name, value) VALUES ('Pink', 'FFA9EE');
INSERT INTO colors (name, value) VALUES ('Orange', 'E8C58E');
INSERT INTO colors (name, value) VALUES ('Red', 'E8FFDE');
