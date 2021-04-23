#!/usr/bin/env php
<?php 
  echo "Cache-Control: no-cache\n";
  echo "Content-type: text/html\n\n";

  $title = "Hello, PHP!";
  $heading = "Amrit, Elton, and Kelly were here - Hello PHP";
  $curr_time = date('l') . " " . date('m/d/Y') . " " . date("h:i:sa"); 
  $ip_address = getenv("REMOTE_ADDR"); 

  $obj_arr = array("title"=>$title, "heading"=>$heading, "message"=>$curr_time, "IP"=>$ip_address); 

  echo json_encode($obj_arr) . "\n";

?>

