#!/usr/bin/ruby
require 'cgi'

cgi = CGI.new

puts "Cache-Control: no-cache\n"
puts "Content-type: text/html\n\n"
puts "<html><head><title>GET Echo</title></head>"
puts "<body>"
puts "<h1 align=center>GET Query String</h1><hr/>\n"

puts "<p><b>Query String: </b>" + cgi.query_string + "</p>"

puts cgi.query_string.split("&")

puts "</body>"
puts "</html>"