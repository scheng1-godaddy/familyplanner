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

-- CREATE TABLE schedule (
--   id SERIAL PRIMARY KEY,
--   start_datetime TIMESTAMP,
--   end_datetime TIMESTAMP,
--   event_id INT,
--   creator_id INT,
--   family_id INT,
--   recurring VARCHAR(255),
--   is_recurring BOOLEAN
-- );
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
  color_id INT
);

CREATE TABLE color (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  value VARCHAR(255)
)

INSERT INTO eventcolor (name, value) VALUES ('Green', 'A8FF9C');
INSERT INTO eventcolor (name, value) VALUES ('Blue', '5A9DE8');
INSERT INTO eventcolor (name, value) VALUES ('Pink', 'FFA9EE');
INSERT INTO eventcolor (name, value) VALUES ('Brown', 'E8C58E');
INSERT INTO eventcolor (name, value) VALUES ('YellowGreen', 'E8FFDE');
