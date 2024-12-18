CREATE TABLE voter(
id int PRIMARY KEY AUTO_INCREMENT,
user_name varchar(41),
password varchar(41),
pfp varchar(255)
);
CREATE TABLE admin(
id int PRIMARY KEY AUTO_INCREMENT,
user_name varchar(41),
password varchar(41),
pfp varchar(255)
);
CREATE TABLE category(
id int PRIMARY KEY AUTO_INCREMENT,
title varchar(255),
id_nominee int,

)
CREATE TABLE nominees(
id int PRIMARY KEY AUTO_INCREMENT,
name varchar(41),
img varchar(255)    
FOREIGN KEY(id_cat) REFERENCES category(id)
);
