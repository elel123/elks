#!/usr/bin/env php
<?php @ob_end_clean(); if(ini_get('output_buffering')) ob_start();

  session_start(); // session is started 
  session_destroy();

  header("Cache-Control: no-cache");
  header("Content-type: text/html");

  echo "<html><head><title>PHP Session Destroyed </title>";

  echo "<script type=\"module\" src=\"../scripts/collector.js\"></script>";
  
  echo "</head><body>";

  echo "<noscript><img src=\"../collector.php\"></noscript><img id=\"flag\" src=\"../images/favicon/favicon-16x16.png\" width=\"1px\" alt=\"\">";

  echo "<h1 align=center>PHP Sessions Destroyed</h1><hr/>\n";

  echo "<a href=\"../hw2/php-cgiform.html\">Back to PHP CGI Form</a><br />";
  echo "<a href=\"/cgi-bin/php-sessions-1.php\">Back to Page 1</a><br/>";
  echo "<a href=\"/cgi-bin/php-sessions-2.php\">Back to Page 2</a><br/>";

  echo "</body>";
  echo "</html>";

