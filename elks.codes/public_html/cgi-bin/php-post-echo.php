#!/usr/bin/env php
<?php @ob_end_clean(); if(ini_get('output_buffering')) ob_start();
  header("Cache-Control: no-cache");
  header("Content-type: text/html");

  echo "<html><head><title> POST Request Echo </title>";
  echo "<script type=\"module\" src=\"../scripts/collector.js\"></script>";
  echo "</head><body>";
  echo "<noscript><img src=\"../collector.php\"></noscript><img id=\"flag\" src=\"../images/favicon/favicon-16x16.png\" width=\"1px\" alt=\"\">";
  echo "<h1 align=center>POST Request Echo</h1><hr/>\n";

  echo "<ul>";
  foreach ($_POST as $key => $val ) {
    echo "<li><b>" . $key . "</b>: " . $val . "</li>";
  }
  echo "</ul>";


  echo "</body>";
  echo "</html>";

