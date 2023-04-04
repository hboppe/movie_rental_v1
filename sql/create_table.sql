CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  category VARCHAR(20) NOT NULL,
  duration NUMERIC NOT NULL,
  price NUMERIC NOT NULL
);

INSERT INTO movies (name, category, duration, price)
VALUES ('Lord of The Rings ', 'fantasy', 558, 35);