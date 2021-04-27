#!/usr/bin/env php
<?php @ob_end_clean(); if(ini_get('output_buffering')) ob_start();
  header("Cache-Control: no-cache");
  header("Content-type: text/html");

  echo "<html><head><title> POST Request Echo </title></head><body><h1 align=center>POST Request Echo</h1><hr/>\n";

  echo "<ul>";
  foreach ($_POST as $key => $val ) {
    echo "<li><b>" . $key . "</b>: " . $val . "</li>";
  }
  echo "</ul>";


  echo "</body>";
  echo "</html>";

