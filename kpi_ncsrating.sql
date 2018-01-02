-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 07, 2017 at 02:21 PM
-- Server version: 5.5.57-0+deb8u1
-- PHP Version: 7.0.19-1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `db_users`
--

-- --------------------------------------------------------

--
-- Table structure for table `kpi_ncsrating`
--

CREATE TABLE IF NOT EXISTS `kpi_clientrating` (
  `id` int(11) NOT NULL,
  `date` varchar(60) NOT NULL,
  `fsonumber` varchar(60) NOT NULL,
  `quotenumber` varchar(60) NOT NULL,
  `hse` int(1) NOT NULL,
  `personnel` int(1) NOT NULL,
  `product` int(1) NOT NULL,
  `service` int(1) NOT NULL,
  `support` int(1) NOT NULL,
  `technology` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kpi_ncsrating`
--

INSERT INTO `kpi_clientrating` (`id`, `date`, `fsonumber`, `quotenumber`, `hse`, `personnel`, `product`, `service`, `support`, `technology`) VALUES
(1, '12/08/2017', 'fso12345678', '12345678', 2, 4, 1, 3, 5, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kpi_ncsrating`
--
ALTER TABLE `kpi_clientrating`
 ADD PRIMARY KEY (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
