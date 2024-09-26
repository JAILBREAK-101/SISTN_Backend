CREATE DATABASE membership_db;
USE membership_db;

CREATE TABLE Membership_reg (
    id INT AUTO_INCREMENT PRIMARY KEY,
    membershipCategory VARCHAR(50),
    surname VARCHAR(100),
    first_name VARCHAR(100),
    other_name VARCHAR(100),
    street_address VARCHAR(255),
    city VARCHAR(100),
    country VARCHAR(100),
    telephone VARCHAR(20),
    email1 VARCHAR(100),
    email2 VARCHAR(100),
    occupation VARCHAR(100),
    institution VARCHAR(255),
    work_organization VARCHAR(255),
    rank VARCHAR(100),
    qualifications TEXT,
    work_experience TEXT,
    passport VARCHAR(255), -- This field stores the file path of the uploaded image
    payment_type VARCHAR(50), -- Stores 'offline' or 'online'
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp of the form submission
    payment_status ENUM('Pending', 'Completed') DEFAULT 'Pending' -- To track payment status
);

CREATE TABLE institutions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    institution_name VARCHAR(255) UNIQUE
);
