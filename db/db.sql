DROP DATABASE IF EXISTS planner;
CREATE DATABASE planner;

\c planner;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  icon_id INTEGER,
  color_id INTEGER
);

INSERT INTO users (name, icon_id, color_id)
  VALUES ('Shawn', 1, 1);
