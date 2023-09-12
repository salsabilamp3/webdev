-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2023 at 01:55 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smission_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `url`, `createdAt`, `updatedAt`) VALUES
(6, 'Acai Bowls', 'c0b7ea2347e8b9f66b75838a5efdb299.jpg', 'http://localhost:5000/images/c0b7ea2347e8b9f66b75838a5efdb299.jpg', '2023-09-12 07:47:59', '2023-09-12 11:27:07'),
(7, 'Blue Hawaii', 'd4de049b0c88acb6d840875407c1d336.jpg', 'http://localhost:5000/images/d4de049b0c88acb6d840875407c1d336.jpg', '2023-09-12 11:09:51', '2023-09-12 11:27:21'),
(8, 'Takoyaki', 'f6cac25f2310691f9b85b3ad1ec853d0.jpg', 'http://localhost:5000/images/f6cac25f2310691f9b85b3ad1ec853d0.jpg', '2023-09-12 11:27:35', '2023-09-12 11:27:53'),
(9, 'Cilok', '8217b9a03b17e881ff3f3d46347f1428.jpg', 'http://localhost:5000/images/8217b9a03b17e881ff3f3d46347f1428.jpg', '2023-09-12 11:35:29', '2023-09-12 11:35:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
