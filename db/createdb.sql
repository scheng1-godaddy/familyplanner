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
