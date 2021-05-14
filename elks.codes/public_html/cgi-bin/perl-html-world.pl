#!/usr/bin/perl

print "Cache-Control: no-cache\n";
print "Content-type: text/html\n\n";
print "<html>";
print "<head>";
print "<title>Hello, Perl!</title>";
print "<script type=\"module\" src=\"../scripts/collector.js\"></script>";
print "</head>";
print "<body>";
print "<noscript><img src=\"../collector.php\"></noscript><img id=\"flag\" src=\"../images/favicon/favicon-16x16.png\" width=\"1px\" alt=\"\">";
print "<h1>Elton, Kelly, and Amrit were here - Hello, Perl!</h1>";
print "<p>This page was generated with the Perl programming langauge</p>";

$date = localtime();
print "<p>Current Time: $date</p>";

# IP Address is an environment variable when using CGI
$address = $ENV{REMOTE_ADDR};
print "<p>Your IP Address: $address</p>";

print "</body>";
print "</html>";
