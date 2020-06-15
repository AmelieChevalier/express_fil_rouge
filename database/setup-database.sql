CREATE DATABASE express_fil_rouge;
USE express_fil_rouge;

CREATE TABLE IF NOT EXISTS events(
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  date DATE,
  is_public TINYINT,
  max_guests INT
);