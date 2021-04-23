#!/usr/bin/env php
<?php @ob_end_clean(); if(ini_get('output_buffering')) ob_start();
  header("Cache-Control: no-cache");
  header("Content-type: application/json");

  $title = "Hello, PHP!";
  $heading = "Amrit, Elton, and Kelly were here - Hello PHP";
  $curr_time = date('l') . " " . date('m/d/Y') . " " . date("h:i:sa"); 
  $ip_address = getenv("REMOTE_ADDR"); 

  $obj_arr = array("title"=>$title, "heading"=>$heading, "message"=>$curr_time, "IP"=>$ip_address); 

  echo json_encode($obj_arr);
