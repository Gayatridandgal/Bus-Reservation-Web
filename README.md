# Bus-Reservation-Web 🚀

This project is a responsive and user-friendly, simple **Bus reservation** that includes features like booking ticket, update and delete of the tickets. It's designed to make trip planning seamless and enjoyable for users.

---

## Tech Stack 🛠️

- **Frontend**: HTML, CSS, TailwindCSS, JavaScript, React.js
- **Backend**: Node.js, Express.js
- **Database**: MySQL (via WAMP Server)

---

## Installation & Setup 🛠️

Follow these steps to run the project locally:

### Prerequisites
1. Node.js installed on your system.
2. WAMP Server or MySQL for the database.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
---
## Bus Reservation Database Setup

### Create the database and tables
```sql
CREATE DATABASE IF NOT EXISTS bus_reservation;

USE bus_reservation;

CREATE TABLE IF NOT EXISTS buses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  route VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  busId INT NOT NULL,
  seats INT NOT NULL,
  date DATE NOT NULL
);



USE bus_reservation;
ALTER TABLE bookings 
ADD COLUMN username VARCHAR(255) NOT NULL, 
ADD COLUMN phonenumber VARCHAR(15) NOT NULL;
DROP TABLE IF EXISTS buses;

CREATE TABLE buses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  source VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  type ENUM('AC', 'Non-AC', 'Sleeper', 'Seater') NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);
INSERT INTO buses (name, source, destination, type, price) VALUES
('KSRTC Express', 'Bangalore', 'Mysore', 'AC', 300),
('KSRTC Rajahamsa', 'Mangalore', 'Hubli', 'Non-AC', 450),
('KSRTC Airavat', 'Bangalore', 'Chikmagalur', 'Sleeper', 600),
('KSRTC Sarige', 'Shimoga', 'Udupi', 'Seater', 250),
('KSRTC Airavat Club', 'Bangalore', 'Belgaum', 'AC', 800);
