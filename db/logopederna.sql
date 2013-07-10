-- phpMyAdmin SQL Dump
-- version 3.5.8.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 10, 2013 at 02:48 PM
-- Server version: 5.5.31-0ubuntu0.13.04.1
-- PHP Version: 5.4.9-4ubuntu2.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `logopederna`
--
CREATE DATABASE `logopederna` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `logopederna`;

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE IF NOT EXISTS `auth` (
  `token` varchar(20) NOT NULL,
  `time` int(10) NOT NULL,
  UNIQUE KEY `token` (`token`),
  KEY `toke` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`token`, `time`) VALUES
('1lLPLs4cIbCsuthsde12', 1373221886),
('Ar9aEJikzlCywXhTnFvy', 1373215466),
('Dyb2sgpe1rauUF2VNxQX', 1373319633),
('Fj3Qf1jHxEMYH846Eqph', 1373319413),
('kE2xdeVhkR8g8RoyCnEX', 1373412618),
('N3wKx5hfft7WUMikajMj', 1373215670),
('nHsIMc66CSwF5500SEq8', 1373221842),
('o9VZLo5vnNvLsW6SZ6Rt', 1373319519),
('z5JLcamnH7hi2mxpnUZm', 1373319294);

-- --------------------------------------------------------

--
-- Table structure for table `contents`
--

CREATE TABLE IF NOT EXISTS `contents` (
  `page_id` varchar(30) NOT NULL,
  `data` text NOT NULL,
  UNIQUE KEY `id` (`page_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contents`
--

INSERT INTO `contents` (`page_id`, `data`) VALUES
('admin', '{"time":1373412601,"content":{"h1":"Hej g&aring; och &auml;t! mozilla? test&lt;br&gt;"}}'),
('index', '{"time":1373319675,"content":{"h1":"Hej!","p1":["nu?"],"h2":"Hur man kommer till oss p&aring; Logopederna","p2":["Vi arbetar p&aring; uppdrag av Stockholms l&auml;ns landsting. F&ouml;r att tr&auml;ffa n&aring;gon av v&aring;ra logopeder beh&ouml;ver du en remiss."],"h3":"Senaste nytt hos Logopederna!","p3":["Nyheter om mottagningarna, logopedi och annat av intresse."]}}'),
('kontakt', '{"time":1373383405,"content":{"n1":" Susana Brandhild ","t1":"Logoped","p1":"08-40 01 50 31","m1":"susana@logopederna.se","n2":"Birgitta R L&ouml;fsdstr&ouml;m","t2":"Logoped","p2":"08-40 01 50 36","m2":"birgitta@logopederna.se"}}'),
('utbildning', '{"time":1373412319,"content":{"h1":"L&aring;t oss utbilda er","p1":[" F&ouml;rel&auml;sningar om dyslexi, spr&aring;kst&ouml;rning, dyskalkyli samt flerspr&aring;kighet. Vi kan &auml;ven skr&auml;ddarsy egna utbildningar efter &ouml;nskem&aring;l. "]}}'),
('vad-vi-gor', '{"time":1373321052,"content":{"h1":"Vad vi g&ouml;r","p1":["Vi utreder och behandlar sv&aring;righeter med spr&aring;k, tal, l&auml;s- och skrivsv&aring;righeter/dyslexi samt matematik. Vi hj&auml;lper &auml;ven till med utprovning och f&ouml;rskrivning av tekniska hj&auml;lpmedel."],"h2":"Utredning ","p2":["Vi utf&ouml;r olika typer av logopediska utredningar. Efter utredningen skrivs ett omfattande utl&aring;tande med ev. diagnos, rekommendationer och utprovning av passande hj&auml;lpmedel."],"h3":"Behandling","p3":["Vi behandlar sv&aring;righeter inom olika omr&aring;den. Vi anpassar tr&auml;ning och insats efter individens f&ouml;ruts&auml;ttningar och behov."],"h4":"Utbildning","p4":["V&aring;ra bes&ouml;kare har m&ouml;jlighet att ta del av f&ouml;rel&auml;sningar, workshops samt eventuell hj&auml;lpmedelsutprovning/intr&auml;ning. Vi handleder &auml;ven skolpersonal. axdasdv"],"h5":"Dyslexi","p5":["Om man upplever att l&auml;sning och stavning/skrivning inte fungerar s&aring; bra som f&ouml;r andra i samma &aring;lder, kan man komma till oss f&ouml;r en utredning. Dyslexi inneb&auml;r att man har sv&aring;righeter med den tekniska l&auml;sningen, vilket kan resultera i l&aring;ngsamt l&auml;stempo och sv&aring;righeter med l&auml;sf&ouml;rst&aring;else. Det medf&ouml;r ofta &auml;ven sv&aring;righeter med stavning och skrivf&ouml;rm&aring;ga. Vi unders&ouml;ker dina l&auml;s- och skrivsv&aring;righeter och rekommenderar l&auml;mpliga &aring;tg&auml;rder, b&aring;de f&ouml;r hemmet och f&ouml;r skolan/jobbet. Vi utprovar och f&ouml;rskriver &auml;ven tekniska hj&auml;lpmedel. Hos oss jobbar logopeder som &auml;ven kan utreda p&aring; engelska, finska, ryska och spanska."],"h6":"Spr&aring;k och tal","p6":["Man har olika l&auml;tt att tala och f&ouml;rst&aring; spr&aring;k oavsett modersm&aring;l. Om de spr&aring;kliga sv&aring;righeterna hindrar dig/ditt barn i studier, arbete eller det sociala livet, kan det bli aktuellt att bes&ouml;ka en logoped. Man kan till exempel ha sv&aring;rt att l&auml;ra sig nya ord, att uttrycka sig i tal och skrift, att ta till sig information genom att lyssna m.m. Sv&aring;righeter med spr&aring;ket kan i l&auml;ngden p&aring;verka l&auml;s- och skrivf&ouml;rm&aring;gan. Vi unders&ouml;ker de spr&aring;kliga f&ouml;rm&aring;gorna och hj&auml;lper till med behandling vid behov. Hos oss jobbar logopeder som &auml;ven kan utreda p&aring; engelska, finska, ryska och spanska."],"h7":"Dyskalkyli","p7":["Specifika r&auml;kneproblem/dyskalkyli inneb&auml;r att man har sv&aring;rt med grundl&auml;ggande r&auml;knef&ouml;rm&aring;ga, som de fyra r&auml;knes&auml;tten samt att per automatik k&auml;nna igen siffror och antal. Sv&aring;righeterna m&auml;rks ofta tidigt, i &aring;rskurs ett eller tidigare. Dessa personer klarar dock dock ofta andra omr&aring;den bra, s&aring;som resonerande eller logiskt t&auml;nkande, s&aring; l&auml;nge det inte r&ouml;r sig om r&auml;kning och matematik. Vi &ouml;nders&ouml;ker dina r&auml;knesv&aring;righeter och rekommenderar l&auml;mpliga &aring;tg&auml;rder."],"h8":"Spr&aring;k","p8":["Vid spr&aring;kliga sv&aring;righeter/spr&aring;kst&ouml;rningar kan man beh&ouml;va logopedkontakt f&ouml;r att st&auml;rka den spr&aring;kliga f&ouml;rm&aring;gan samt f&ouml;r att f&aring; de r&auml;tta verktygen att arbeta vidare p&aring; egen hand. F&ouml;r barn och skolelever kan det &auml;ven vara l&auml;mpligt att f&ouml;rskole- eller skolpersonal f&aring;r handledning av logoped. En spr&aring;kbehandling f&ouml;reg&aring;s i regel av spr&aring;klig utredning."],"h9":"Uttal","p9":["Vi erbjuder logopedbehandling vid uttalssv&aring;righeter hos barn och ungdomar. leeeeeeeeroy! .......jenikns mohahaha"],"h10":"R&ouml;st","p10":["Vi tr&auml;ffar barn och vuxna med r&ouml;stproblem som heshet, klumpk&auml;nsla eller r&ouml;sttr&ouml;tthet. Du kan komma f&ouml;r r&ouml;stbehandling via remiss fr&aring;n &ouml;ron-, n&auml;s- och halsl&auml;kare eller foniater. Du kan &auml;ven komma via remiss fr&aring;n din husl&auml;kare. Inf&ouml;r nybes&ouml;ket hos logoped b&ouml;r en st&auml;mbandsunders&ouml;kning vara genomf&ouml;rd hos &ouml;ron-, n&auml;s- och halsl&auml;kare eller foniater."]}}');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE IF NOT EXISTS `events` (
  `event_id` int(11) NOT NULL AUTO_INCREMENT,
  `data` text NOT NULL,
  `start_date` int(10) NOT NULL,
  `end_date` int(10) NOT NULL,
  PRIMARY KEY (`event_id`),
  UNIQUE KEY `id` (`event_id`),
  KEY `start_date` (`start_date`,`end_date`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `data`, `start_date`, `end_date`) VALUES
(1, '{"title":"Rubrik","lead":" Ingress ","text":" Allm&auml;nt om h&auml;ndelsen ","how":" ","registration":" ","start":1375529820,"end":1375529820,"time":1373411600,"when":"3 aug 13:37"}', 1375529820, 1375529820),
(2, '{"title":"Rubrik","lead":" Ingress ","text":" Allm&auml;nt om h&auml;ndelsen ","how":" ","registration":" ","start":1375529820,"end":1375529880,"time":1373411619,"when":"3 aug - 13:38"}', 1375529820, 1375529880),
(3, '{"title":"Rubrik","lead":" Ingress ","text":" Allm&auml;nt om h&auml;ndelsen ","how":" ","registration":" ","start":1375529820,"end":1375529880,"time":1373411699,"when":"3 aug 13:37 - 13:38"}', 1375529820, 1375529880),
(4, '{"title":"Rubrik","lead":" Ingress ","text":" Allm&auml;nt om h&auml;ndelsen ","how":" ","registration":" ","start":1375529820,"end":1375616280,"time":1373411720,"when":"3 aug 13:37 - 4 13:38"}', 1375529820, 1375616280),
(5, '{"title":"Rubrik","lead":" Ingress ","text":" Allm&auml;nt om h&auml;ndelsen ","how":" ","registration":" ","start":1375529820,"end":1375616280,"time":1373411790,"when":"3 aug 13:37 - 4 aug 13:38"}', 1375529820, 1375616280),
(6, '{"title":"Rubrik","lead":" Ingress ","text":" Allm&auml;nt om h&auml;ndelsen ","how":" ","registration":" ","start":1375529820,"end":1378294680,"time":1373411804,"when":"3 aug 13:37 - 4 sept 13:38"}', 1375529820, 1378294680),
(7, '{"title":"Rubrik","lead":" Ingress ","text":" Allm&auml;nt om h&auml;ndelsen ","how":" ","registration":" ","start":1375529820,"end":1409830680,"time":1373411846,"when":"3 aug 2013 13:37 - 4 sept 2014 13:38"}', 1375529820, 1409830680),
(8, '{"title":"Rubrik","lead":" Ingress ","text":" Allm&auml;nt om h&auml;ndelsen ","how":" ","registration":" ","start":1407065820,"end":1407065820,"time":1373411871,"when":"3 aug 2014 13:37"}', 1407065820, 1407065820),
(9, '{"title":"Rubrik","lead":" Ingress ","text":" Allm&auml;nt om h&auml;ndelsen ","how":" ","registration":" ","start":1407065820,"end":1407065880,"time":1373411893,"when":"3 aug 2014 13:37 - 3 aug 2014 13:38"}', 1407065820, 1407065880),
(10, '{"title":"Rubrik","lead":" Ingress ","text":" Allm&auml;nt om h&auml;ndelsen ","how":" ","registration":" ","start":942274800,"end":942274800,"time":1373412294,"when":"11 nov 1999 00:00"}', 942274800, 942274800),
(11, '{"title":"Rubrik","lead":" Ingress ","text":" Allm&auml;nt om h&auml;ndelsen ","how":" ","registration":" ","start":1373412360,"end":1373412360,"time":1373412453,"when":"10 jul 01:26"}', 1373412360, 1373412360);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
