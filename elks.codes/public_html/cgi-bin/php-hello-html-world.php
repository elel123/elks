#!/usr/bin/env php
<?php 
  echo "Cache-Control: no-cache\n";
  echo "Content-type: text/html\n\n";

  echo "<html>"; 

  echo "<head>"; 
  echo "<title>Hello, PHP!</title>"; 
  echo "Amrit, Elton, and Kelly were here - Hello PHP"; 
  echo "</head>"; 

  echo "<body>"; 
  echo "<h1> Amrit, Elton, and Kelly were here - Hello, PHP! </h1>"; 
  echo "<p> This page was generated with the PHP programming language </p>"; 

  echo "The current time is " . date('l') . " " . date('m/d/Y') . " " . date("h:i:sa"); 

  $ip_address = getenv("REMOTE_ADDR"); 
  echo "<p> Your IP Address: " . $ip_address . "</p>"; 

  echo "</body>"; 
  echo "</html>"; 

?>
