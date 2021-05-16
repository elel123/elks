#!/usr/bin/ruby
require 'cgi'

cgi = CGI.new

puts "Cache-Control: no-cache\n"
puts "Content-type: text/html\n\n"
puts "<html><head><title>POST Echo</title>"

puts "<script type=\"module\" src=\"../scripts/collector.js\"></script>"
puts "</head>"
puts "<body>"
puts "<noscript><img src=\"../collector.php\"></noscript><img id=\"flag\" src=\"../images/favicon/favicon-16x16.png\" width=\"1px\" alt=\"\">"

puts "<h1 align=center>POST Message Body</h1><hr/>\n"

puts "<p><b>Message Body: </b></p>"

puts "<ul>"
cgi.params.each do |key, value|
    new_value = value.inspect[2..-3]
    puts "<li> #{key} = #{new_value}</li>"
end

puts "</ul>"

puts "</body>"
puts "</html>"