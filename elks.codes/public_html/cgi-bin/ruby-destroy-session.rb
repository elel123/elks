#!/usr/bin/ruby
require 'cgi'
require 'cgi/session'

cgi = CGI.new("html4")

sess = CGI::Session.new(cgi)

cookie = CGI::Cookie.new('name' => 'mycookie')

sess.delete

cgi.out("cookie" => cookie, "Cache-Control" => "no-cache", "type" => "text/html") { "" }

print "<html>";
print "<head>";
print "<title>Perl Session Destroyed</title>";
print "<script type=\"module\" src=\"../scripts/collector.js\"></script>";
print "</head>";
print "<body>";
print "<noscript><img src=\"../collector.php\"></noscript><img id=\"flag\" src=\"../images/favicon/favicon-16x16.png\" width=\"1px\" alt=\"\">";
print "<h1>Session Destroyed</h1>";
print "<a href=\"../hw2/ruby-cgiform.html\">Back to the Perl CGI Form</a><br />";
print "<a href=\"/cgi-bin/ruby-sessions-1.rb\">Back to Page 1</a><br />";
print "<a href=\"/cgi-bin/ruby-sessions-2.rb\">Back to Page 2</a>";
print "</body>";
print "</html>";