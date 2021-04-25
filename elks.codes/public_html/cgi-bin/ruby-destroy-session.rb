#!/usr/bin/ruby
require 'cgi'
require 'cgi/session'

cgi = CGI.new("html4")

sess = CGI::Session.new(cgi)

sess.delete

puts "Cache-Control: no-cache\n"
puts "Content-type: text/html\n\n"
print "<html>";
print "<head>";
print "<title>Perl Session Destroyed</title>";
print "</head>";
print "<body>";
print "<h1>Session Destroyed</h1>";
print "<a href=\"../hw2/ruby-cgiform.html\">Back to the Perl CGI Form</a><br />";
print "<a href=\"/cgi-bin/ruby-sessions-1.rb\">Back to Page 1</a><br />";
print "<a href=\"/cgi-bin/ruby-sessions-2.rb\">Back to Page 2</a>";
print "</body>";
print "</html>";