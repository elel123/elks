#!/usr/bin/php
<?php @ob_end_clean(); if(ini_get('output_buffering')) ob_start();
  header("Cache-Control: no-cache");
  header("Content-type: text/html");

  echo "<html><head><title>Environment Variables</title>";
  
  echo "<script type=\"module\" src=\"../scripts/collector.js\"></script>";

  echo "</head><body>";

  echo "<noscript><img src=\"../collector.php\"></noscript><img id=\"flag\" src=\"../images/favicon/favicon-16x16.png\" width=\"1px\" alt=\"\">";
  
  echo "<h1 align=center>Environment Variables</h1><hr/>\n";

  echo "<h2> Environment Variables: </h2>"; 
  $env_arr = getenv();

  foreach ($env_arr as $key => $val ) { 
    echo "<b>" . $key . ":</b>" . $val . "<br />\n";
  }


  echo "<h2> Server Variables: </h2>"; 
  foreach ($_SERVER as $a_key => $a_val ) { 
    echo "<b>" . $a_key . ":</b>" . $a_val . "<br />\n";
  }


  echo "</body>"; 
  echo "</html>"; 
