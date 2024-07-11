
CREATE TABLE admins
(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(255),
  password_hash VARCHAR(255)
);

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(255),
  license_number VARCHAR(50),
  private_hash VARCHAR(255)
);

CREATE TABLE regions
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  country VARCHAR(50),
  city VARCHAR(50)
);

CREATE TABLE points
(
  id SERIAL PRIMARY KEY,
  lat FLOAT,
  lng FLOAT,

  region_id INT,
  CONSTRAINT fk_region FOREIGN KEY(region_id) REFERENCES regions(id)
);

CREATE TABLE obstacles
(
  id SERIAL PRIMARY KEY,
  lat FLOAT,
  lng FLOAT,
  type VARCHAR(50),
  status VARCHAR(50),
  no_reports INT,
  image_url VARCHAR(255),

  region_id INT,
  CONSTRAINT fk_region FOREIGN KEY(region_id) REFERENCES regions(id)
);

CREATE TABLE reports
(
  id SERIAL PRIMARY KEY,
  lat FLOAT,
  lng FLOAT,
  image_url VARCHAR(255),

  obstacle_id INT,
  CONSTRAINT fk_obstacle FOREIGN KEY(obstacle_id) REFERENCES obstacles(id),

  user_id INT,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

