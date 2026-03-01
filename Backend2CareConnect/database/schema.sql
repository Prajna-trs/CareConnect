
CREATE DATABASE care_system;
USE care_system;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role ENUM('elder','caretaker','ngo','admin','orphan'),
    isApproved BOOLEAN DEFAULT FALSE
);

CREATE TABLE care_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    elderId INT,
    typeOfHelp VARCHAR(100),
    description TEXT,
    status ENUM('pending','approved','assigned','completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (elderId) REFERENCES users(id)
);

CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    action VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE orphan_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orphanId INT NOT NULL,
    supportType ENUM('education','medical','shelter','financial') NOT NULL,
    description TEXT NOT NULL,
    status ENUM('pending','approved','assigned','completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (orphanId) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    action VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
