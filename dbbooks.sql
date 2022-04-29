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
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (57,'App\\Models\\User',17,'auth_token','56f25eeea6fd6880e380202782ee132a3caf702b579eb864273cc33d8b2f0a31','[\"*\"]',NULL,'2022-04-28 07:28:12','2022-04-28 07:28:12'),(58,'App\\Models\\User',17,'auth_token','889ec0c62590e9a819fa092529ed133fd42d17187bf7495cb4ec890f1116cead','[\"*\"]','2022-04-28 07:39:00','2022-04-28 07:28:30','2022-04-28 07:39:00'),(59,'App\\Models\\User',15,'auth_token','5bfed034281ad311c824f8acdca467fa3468db85ea2fa19a598cbc442913b938','[\"*\"]',NULL,'2022-04-28 07:39:26','2022-04-28 07:39:26'),(60,'App\\Models\\User',17,'auth_token','0dd28dc04b6a6faf3ac2d703327e34eef67379b6c6205205c773117983b42c62','[\"*\"]',NULL,'2022-04-28 07:40:13','2022-04-28 07:40:13'),(61,'App\\Models\\User',17,'auth_token','84c75e5a60a1621520554a272e502aff8033a7cdec5aeb64574406ae01bd64db','[\"*\"]','2022-04-28 08:23:20','2022-04-28 07:40:13','2022-04-28 08:23:20'),(62,'App\\Models\\User',17,'auth_token','dc3ac15a5e32dda40a5b00db51e526fde94107be6b4d949e66ba45317093047e','[\"*\"]','2022-04-28 09:28:31','2022-04-28 09:09:50','2022-04-28 09:28:31'),(63,'App\\Models\\User',15,'auth_token','aab7395bd68cf0f8e7867cb2bdeec491bef6fe4fffa15a439fb9fc0c44526750','[\"*\"]',NULL,'2022-04-28 09:42:29','2022-04-28 09:42:29'),(64,'App\\Models\\User',15,'auth_token','0c5415fb99ff5d00864c7d93f4f39171e47a1b581044a98cddee5e3eb80f5ee1','[\"*\"]',NULL,'2022-04-28 09:42:29','2022-04-28 09:42:29'),(65,'App\\Models\\User',15,'auth_token','5bfd3abad5453909c860a7135e677cb2c7f1956a90e84f10f89229a5a468267a','[\"*\"]',NULL,'2022-04-28 17:44:23','2022-04-28 17:44:23'),(66,'App\\Models\\User',15,'auth_token','2e08d8d2823f27780f6ecadc08eb79d4619aa2c1edab70f846c0fbb809509eb1','[\"*\"]','2022-04-28 18:30:52','2022-04-28 17:44:23','2022-04-28 18:30:52'),(67,'App\\Models\\User',17,'auth_token','eb3b2570030d4f0d74d14cf601438c8dbcc18f92c963ea0ba0ec790542460234','[\"*\"]',NULL,'2022-04-28 18:31:17','2022-04-28 18:31:17'),(68,'App\\Models\\User',17,'auth_token','ce09d867e901573aeff81ea5eaac3c66450956277a43c1c96e4397867ab6a484','[\"*\"]','2022-04-28 18:39:16','2022-04-28 18:31:17','2022-04-28 18:39:16');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblbooks`
--

LOCK TABLES `tblbooks` WRITE;
/*!40000 ALTER TABLE `tblbooks` DISABLE KEYS */;
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
  `UserID` varchar(100) DEFAULT '1',
  `BookID` varchar(100) DEFAULT NULL,
  `Status` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`CartID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblcart`
--

LOCK TABLES `tblcart` WRITE;
/*!40000 ALTER TABLE `tblcart` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblcart_purchase`
--

LOCK TABLES `tblcart_purchase` WRITE;
/*!40000 ALTER TABLE `tblcart_purchase` DISABLE KEYS */;
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
  `UserID` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`LibraryID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbllibrary`
--

LOCK TABLES `tbllibrary` WRITE;
/*!40000 ALTER TABLE `tbllibrary` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbllibrary_detail`
--

LOCK TABLES `tbllibrary_detail` WRITE;
/*!40000 ALTER TABLE `tbllibrary_detail` DISABLE KEYS */;
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
-- Table structure for table `tbluser_profile`
--

DROP TABLE IF EXISTS `tbluser_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbluser_profile` (
  `UserProfileID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `UserType` varchar(100) DEFAULT NULL,
  `FirstName` varchar(100) DEFAULT NULL,
  `LastName` varchar(100) DEFAULT NULL,
  `ContactNo` varchar(100) DEFAULT NULL,
  `PhoneNo` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `UserID` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`UserProfileID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbluser_profile`
--

LOCK TABLES `tbluser_profile` WRITE;
/*!40000 ALTER TABLE `tbluser_profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbluser_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (11,'zeand15','myze2016@gmail.com',NULL,'$2y$10$DZZk9LVkg0u4T3QfrGr9..vxL9InxKsG7nu3fNitmiMVD0wNBd.Vy',NULL,'2022-04-27 04:53:19','2022-04-27 04:53:19'),(13,'zeand123124','z4@gmail.com',NULL,'$2y$10$mtzfIFea1fWoNmYU3yYSOuRtIHcq6Es.3R6hgfuFkYbYBIUhg7B3G',NULL,'2022-04-28 04:37:47','2022-04-28 04:37:47'),(15,'admin','admin',NULL,'$2y$10$IA7.wf8hFb9mmFenZWZAlekY9RTq7en3CTWH3f8jwx6S6a4CX7z96',NULL,'2022-04-28 04:40:02','2022-04-28 04:40:02'),(17,'user','user@email.com',NULL,'$2y$10$iFscmmmg2WjPo26eOHhSYenGIEhfZvGvFiCMI2MA5trvh6s/T4lJm',NULL,'2022-04-28 07:28:12','2022-04-28 07:28:12');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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

-- Dump completed on 2022-04-29 15:55:59
