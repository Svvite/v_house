-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 20. Sep 2015 um 18:30
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
-- Tabellenstruktur für Tabelle `houses`
--

CREATE TABLE IF NOT EXISTS `houses` (
  `id` int(11) NOT NULL COMMENT 'System ID for the script',
  `name` text COLLATE utf8_general_mysql500_ci NOT NULL COMMENT 'individual name',
  `location` text COLLATE utf8_general_mysql500_ci NOT NULL COMMENT 'individual name',
  `cx` float NOT NULL COMMENT 'Location X',
  `cy` float NOT NULL COMMENT 'Location Y',
  `cz` float NOT NULL COMMENT 'Location Z',
  `price` int(11) NOT NULL COMMENT 'Price',
  `rentbool` tinyint(1) NOT NULL COMMENT 'Boolean to activate/deactivate renting',
  `rentcost` int(11) NOT NULL COMMENT 'Cost per payday for renter',
  `level` int(11) NOT NULL COMMENT 'Required level to buy house',
  `powercost` int(11) NOT NULL COMMENT 'Powercosts per payday',
  `cashbox` int(11) NOT NULL COMMENT 'The house cashbox, where rents are getting in + renters can (only) deposit money.',
  `owner` text COLLATE utf8_general_mysql500_ci NOT NULL COMMENT 'Owner of the house',
  `renter` int(11) NOT NULL COMMENT 'Amount of renters',
  `forbidden` text COLLATE utf8_general_mysql500_ci NOT NULL COMMENT 'Banned/forbidden renters of the house owner (/housekick)',
  `house_index` int(11) NOT NULL COMMENT 'Do not change this one! House counter/index!'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci COMMENT='house db';

--
-- Daten für Tabelle `houses`
--

INSERT INTO `houses` (`id`, `name`, `location`, `cx`, `cy`, `cz`, `price`, `rentbool`, `rentcost`, `level`, `powercost`, `cashbox`, `owner`, `renter`, `forbidden`, `house_index`) VALUES
(9999, '-', '-', -1, -1, -1, -1, -1, -1, -1, -1, -1, '-', -1, '-', -1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
