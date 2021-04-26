#!/usr/bin/env php
<?php @ob_end_clean(); if(ini_get('output_buffering')) ob_start();
  header("Cache-Control: no-cache");
  header("Content-type: text/html");

  echo "<html><head><title> POST Request Echo </title></head><body><h1 align=center>POST Request Echo</h1><hr/>\n";

  $query_string = getenv("QUERY_STRING");
  echo "<b>Message Body:</b>" . $query_string . "<br/><br/>";

  echo "<ul>";
  foreach ($_POST as $key => $val ) {
    echo "<li>" . $key . ":" . $val . "</li>";
  }
  echo "</ul>";


  /**
  if( getenv("CONTENT_LENGTH") > 0 ) { 
    //$contents = fgets( STDIN, getenv("CONTENT_LENGTH")); 
    $contents = file_get_contents( STDIN); 
    echo "Something's up <br>"; 
    echo "<br>" . $contents . " OVER " . "</br>"; 
  }
  else { 
    echo "<br> YO, levi </br> "; 
  }
   */



  echo "</body>";
  echo "</html>";

