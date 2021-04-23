#!/usr/bin/env php
<?php @ob_end_clean(); if(ini_get('output_buffering')) ob_start();
  header("Cache-Control: no-cache");
  header("Content-type: text/html");

  echo "<html>"; 

  echo "<head>"; 
  echo "<title>Hello, HTML World, PHP!</title>"; 
  echo "</head>"; 

  echo "<body>"; 
  echo "<h1> Amrit, Elton, and Kelly were here - Hello HTML World, PHP! </h1>"; 
  echo "<p> This page was generated with the PHP programming language </p>"; 

  echo "The current time is " . date('l') . " " . date('m/d/Y') . " " . date("h:i:sa"); 

  $ip_address = getenv("REMOTE_ADDR"); 
  echo "<p> Your IP Address: " . $ip_address . "</p>"; 

  echo "</body>"; 
  echo "</html>"; 
