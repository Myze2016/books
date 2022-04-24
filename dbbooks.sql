-- MySQL dump 10.13  Distrib 5.7.29, for Win64 (x86_64)
--
-- Host: localhost    Database: dbbooks
-- ------------------------------------------------------
-- Server version	5.7.29-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tblbooks`
--

DROP TABLE IF EXISTS `tblbooks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblbooks` (
  `BookID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(150) DEFAULT NULL,
  `Description` varchar(150) DEFAULT NULL,
  `ApiID` varchar(150) DEFAULT NULL,
  `Price` double(30,6) DEFAULT NULL,
  `RegisterFlag` int(11) NOT NULL DEFAULT '0' COMMENT '1 = Product is available',
  PRIMARY KEY (`BookID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblbooks`
--

LOCK TABLES `tblbooks` WRITE;
/*!40000 ALTER TABLE `tblbooks` DISABLE KEYS */;
INSERT INTO `tblbooks` VALUES (4,'The Language of Flowers','1852','2bCdaZ7KvDsC',1000.000000,0),(5,'Flowers and foliage for In-door Plant Cases: or, hints for arranging and preserving flowers in cases and in rooms','1861','uKpWAAAAcAAJ',10000.000000,0);
/*!40000 ALTER TABLE `tblbooks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblcart`
--

DROP TABLE IF EXISTS `tblcart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblcart` (
  `CartID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` varchar(100) DEFAULT NULL,
  `BookID` varchar(100) DEFAULT NULL,
  `Status` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`CartID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblcart`
--

LOCK TABLES `tblcart` WRITE;
/*!40000 ALTER TABLE `tblcart` DISABLE KEYS */;
INSERT INTO `tblcart` VALUES (1,NULL,'3','Pending'),(2,NULL,'3','Pending'),(3,NULL,'4','Pending'),(4,NULL,'5','Pending'),(5,NULL,'5','Pending');
/*!40000 ALTER TABLE `tblcart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblcart_purchase`
--

DROP TABLE IF EXISTS `tblcart_purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblcart_purchase` (
  `CartPurchaseID` int(11) NOT NULL AUTO_INCREMENT,
  `CartID` int(11) DEFAULT NULL,
  `Amount` double(30,6) DEFAULT '0.000000',
  `xTimestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`CartPurchaseID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblcart_purchase`
--

LOCK TABLES `tblcart_purchase` WRITE;
/*!40000 ALTER TABLE `tblcart_purchase` DISABLE KEYS */;
INSERT INTO `tblcart_purchase` VALUES (2,3,1000.000000,'2022-04-23 15:04:56'),(3,4,10000.000000,'2022-04-23 15:05:40');
/*!40000 ALTER TABLE `tblcart_purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbllibrary`
--

DROP TABLE IF EXISTS `tbllibrary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbllibrary` (
  `LibraryID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(150) DEFAULT NULL,
  `Description` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`LibraryID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbllibrary`
--

LOCK TABLES `tbllibrary` WRITE;
/*!40000 ALTER TABLE `tbllibrary` DISABLE KEYS */;
INSERT INTO `tbllibrary` VALUES (2,'LibraryTest','TestLib');
/*!40000 ALTER TABLE `tbllibrary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbllibrary_detail`
--

DROP TABLE IF EXISTS `tbllibrary_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbllibrary_detail` (
  `LibraryUserID` int(11) NOT NULL AUTO_INCREMENT,
  `Description` varchar(100) DEFAULT NULL,
  `BookID` int(11) DEFAULT NULL,
  `LibraryID` int(11) DEFAULT NULL,
  PRIMARY KEY (`LibraryUserID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbllibrary_detail`
--

LOCK TABLES `tbllibrary_detail` WRITE;
/*!40000 ALTER TABLE `tbllibrary_detail` DISABLE KEYS */;
INSERT INTO `tbllibrary_detail` VALUES (1,NULL,3,2);
/*!40000 ALTER TABLE `tbllibrary_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbllibrary_user`
--

DROP TABLE IF EXISTS `tbllibrary_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbllibrary_user` (
  `LibraryID` int(11) NOT NULL AUTO_INCREMENT,
  `BookID` varchar(150) DEFAULT NULL,
  `librayuserid` int(11) DEFAULT NULL,
  PRIMARY KEY (`LibraryID`),
  UNIQUE KEY `tbllibrary_user_un` (`LibraryID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbllibrary_user`
--

LOCK TABLES `tbllibrary_user` WRITE;
/*!40000 ALTER TABLE `tbllibrary_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbllibrary_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbluser`
--

DROP TABLE IF EXISTS `tbluser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbluser` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `UserType` varchar(100) DEFAULT NULL,
  `FirstName` varchar(100) DEFAULT NULL,
  `LastName` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbluser`
--

LOCK TABLES `tbluser` WRITE;
/*!40000 ALTER TABLE `tbluser` DISABLE KEYS */;
INSERT INTO `tbluser` VALUES (1,'user','user','User','Zeand Myson','Achas'),(2,'admin','admin','Admin','Admin',NULL);
/*!40000 ALTER TABLE `tbluser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'dbbooks'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-25  0:03:30
