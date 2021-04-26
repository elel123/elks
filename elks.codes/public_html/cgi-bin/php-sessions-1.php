#!/usr/bin/env php
<?php @ob_end_clean(); if(ini_get('output_buffering')) ob_start();

  session_start(); // session is started 

  header("Cache-Control: no-cache");
  header("Content-type: text/html");

  echo "<html><head><title>PHP Sessions </title></head><body><h1 align=center>PHP Sessions Page 1</h1><hr/>\n";

  // Case 1: Name is stored in session 
  if( isset( $_SESSION['USERNAME'] ) ) { 
      echo "<p><b>Name:</b>" . $_SESSION['USERNAME'] . "</p>";
  }
  // Case 2: Name not stored in session 
  else { 
    // Form was submitted  => new name submitted, must be saved in session 
    if( isset( $_POST['username'] ) ) { 
      // Store Data in PHP Session 
      $_SESSION['USERNAME'] = $_POST['username']; 
      echo "<p><b>Name:</b>" . $_SESSION['USERNAME'] . "</p>";
    }
    // No name in session at all 
    else { 
      echo "<p><b>Name:</b> You do not have a name set </p>";
    }
  }
  
  echo "<br/><br/>";
  echo "<a href=\"/cgi-bin/php-sessions-2.php\">Session Page 2</a><br/>";
  echo "<a href=\"../hw2/php-cgiform.html\">PHP CGI Form</a><br />";
  echo "<form style=\"margin-top:30px\" action=\"/cgi-bin/php-destroy-session.php\" method=\"get\">";
  echo "<button type=\"submit\">Destroy Session</button>";
  echo "</form>";

  echo "</body>";
  echo "</html>";

