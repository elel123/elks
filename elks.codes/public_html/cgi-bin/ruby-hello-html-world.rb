#!/usr/bin/ruby

time = Time.new

puts "Cache-Control: no-cache\n"
puts "Content-type: text/html\n\n"
puts "<html><head><title>Hello Ruby CGI World</title>"

puts "<script type=\"module\" src=\"../scripts/collector.js\"></script>"
puts "</head>"
puts "<body>"
puts "<noscript><img src=\"../collector.php\"></noscript><img id=\"flag\" src=\"../images/favicon/favicon-16x16.png\" width=\"1px\" alt=\"\">"

puts "<h1 align=center>Hello HTML World from Amrit, Elton, and Kelly</h1><hr/>\n"
puts "<p>Hello World</p>"
puts "<p>This page was generated with the Ruby programming language</p>"
puts "<p>This program was generated at: " + time.inspect + "</p>"
puts "<p>Your IP Address: " + ENV['REMOTE_ADDR'] + "</p>"

puts "</body>"
puts "</html>"