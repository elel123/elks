#!/usr/bin/env php
<?php 
  echo "Cache-Control: no-cache\n";
  echo "Content-type: text/html\n\n";

  echo "<html><head><title>Environment Variables</title></head><body><h1 align=center>Environment Variables</h1><hr/>\n";

  echo "<h2> Environment Variables: </h2>"; 
  $env_arr = getenv();

  foreach ($env_arr as $key => $val ) { 
    echo "<b>" . $key . ":</b>" . $val . "<br />\n";
  }


  echo "<h2> Server Variables: </h2>"; 
  foreach ($apache_getenv() as $key => $val ) { 
    echo "<b>" . $key . ":</b>" . $val . "<br />\n";
  }


  echo "</body>"; 
  echo "</html>"; 

?>
