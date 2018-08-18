DROP DATABASE IF EXISTS planner;
CREATE DATABASE planner;

\c planner;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(50),
  email VARCHAR(50)
);

INSERT INTO users (username, password, email)
  VALUES ('Shawn', 'password', 'shawnc4019@gmail.com');
