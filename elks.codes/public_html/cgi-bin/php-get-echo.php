#!/usr/bin/env php
<?php @ob_end_clean(); if(ini_get('output_buffering')) ob_start();
  header("Cache-Control: no-cache");
  header("Content-type: text/html");

  echo "<html><head><title>GET Query </title>";
  echo "<script type=\"module\" src=\"../scripts/collector.js\"></script>";
  echo "</head><body>";
  echo "<noscript><img src=\"../collector.php\"></noscript><img id=\"flag\" src=\"../images/favicon/favicon-16x16.png\" width=\"1px\" alt=\"\">";
  echo "<h1 align=center>GET Query String</h1><hr/>\n";

  $query_string = getenv("QUERY_STRING");
  echo "Raw query string: " . $query_string . "\n<br/><br/>";

  // Get and format query string
  //$query_arr = preg_split("&", $query_string);
  $query_arr = explode("&", $query_string);

  if( count($query_arr) > 0 ) {
    foreach ($query_arr as $token) {
      if( $token != "" ) {
        $token_arr = explode("=", $token, 2);
        echo "<tr><td>" . $token_arr[0] . ":</td><td>" . $token_arr[1] . "</td></tr><br>";
      }
    }
  }

  echo "</body>";
  echo "</html>";

