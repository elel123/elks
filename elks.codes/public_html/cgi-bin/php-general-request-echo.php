#!/usr/bin/env php
<?php @ob_end_clean(); if(ini_get('output_buffering')) ob_start();
  header("Cache-Control: no-cache");
  header("Content-type: text/html");

  echo "<html><head><title>General Echo</title>";
  echo "<script type=\"module\" src=\"../scripts/collector.js\"></script>";
  echo "</head><body>";
  echo "<noscript><img src=\"../collector.php\"></noscript><img id=\"flag\" src=\"../images/favicon/favicon-16x16.png\" width=\"1px\" alt=\"\">";
  echo "<h1 align=center>General Request Echo</h1><hr/>\n";

  echo "<p><b> HTTP Protocol: </b>" . getenv('SERVER_PROTOCOL') . "</p>";
  echo "<p><b> HTTP Protocol: </b>" . getenv('REQUEST_METHOD') . "</p>";


  $query_string = getenv("QUERY_STRING");
  $msg_body = fgets(stream_get_contents(STDIN));
  echo "<b>Raw query string:</b>" . $query_string;


  // Get and format query string
  $query_arr = explode("&", $query_string);

  if( count($query_arr) > 0 ) {
    echo "<ul>";
    foreach ($query_arr as $token) {
      if( $token != "" ) {
        $token_arr = explode("=", $token, 2);
        echo "<li><b>" . $token_arr[0] . "</b>: " . $token_arr[1] . "</li>";
      }
    }
    echo "</ul>";
  }


  echo "<b>Message Body:</b>" . $msg_body;
  if ( getenv('REQUEST_METHOD') == 'POST' ) {
    echo "<ul>";
    foreach ($_POST as $key => $val ) {
      echo "<li><b>" . $key . "</b>: " . $val . "</li>";
    }
    echo "</ul>";

  }


  echo "</body>";
  echo "</html>";

