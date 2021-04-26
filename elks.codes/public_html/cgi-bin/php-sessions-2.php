#!/usr/bin/env php
<?php @ob_end_clean(); if(ini_get('output_buffering')) ob_start();

  //$session_id = session_id($_COOKIE['PHPSESSID']); 
  session_start(); // session is started 

  header("Cache-Control: no-cache");
  header("Content-type: text/html");


  echo "<html><head><title>PHP Sessions </title></head><body><h1 align=center>PHP Sessions Page 2</h1><hr/>\n";

  if( isset( $_SESSION['USERNAME'] )) { 
    echo "<p><b>Name:</b>" . $_SESSION['USERNAME'] . "</p>";
  }
  else { 
    echo "<p><b>Name:</b> You do not have a name set </p>";
  }
  
  echo "<br/><br/>";
  echo "<a href=\"/cgi-bin/php-sessions-1.php\">Session Page 1</a><br/>";
  echo "<a href=\"../hw2/php-cgiform.html\">PHP CGI Form</a><br />";
  echo "<form style=\"margin-top:30px\" action=\"/cgi-bin/php-destroy-session.php\" method=\"get\">";
  echo "<button type=\"submit\">Destroy Session</button>";
  echo "</form>";

  echo "</body>";
  echo "</html>";

