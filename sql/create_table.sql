CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  category VARCHAR(20) NOT NULL,
  duration INTEGER NOT NULL,
  price NUMERIC(10,2) NOT NULL
);