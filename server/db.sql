CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(250) NOT NULL,
    pseudo VARCHAR(100) NOT NULL
);

CREATE TABLE room (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) UNIQUE NOT NULL
);

CREATE TABLE message (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    id_room INT NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES user(id),
    FOREIGN KEY (id_room) REFERENCES room(id)
);

CREATE TABLE user_room (
    id_user INT NOT NULL,
    id_room INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES user(id),
    FOREIGN KEY (id_room) REFERENCES room(id)
);
