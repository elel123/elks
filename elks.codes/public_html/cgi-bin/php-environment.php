#!/usr/bin/env php
<?php 
  echo "Cache-Control: no-cache\n";
  echo "Content-type: text/html\n\n";

  echo "<html><head><title>Environment Variables</title></head><body><h1 align=center>Environment Variables</h1><hr/>\n";

  $env_arr = getenv();

  foreach ($env_arr as $key => $val ) { 
    echo "<b>" . $key . ":</b>" . $val . "<br />\n";
  }


  echo "</body>"; 
  echo "</html>"; 

?>
