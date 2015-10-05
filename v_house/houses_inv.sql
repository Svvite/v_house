-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 05. Okt 2015 um 23:23
-- Server Version: 5.6.17
-- PHP-Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `reallife`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `houses_inv`
--

CREATE TABLE IF NOT EXISTS `houses_inv` (
  `id` int(11) NOT NULL COMMENT 'The House ID',
  `lightarmor` int(11) NOT NULL,
  `heavyarmor` int(11) NOT NULL,
  `tv` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- Daten für Tabelle `houses_inv`
--

INSERT INTO `houses_inv` (`id`, `lightarmor`, `heavyarmor`, `tv`) VALUES
(0, 0, 0, 0),
(1, 0, 3, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
