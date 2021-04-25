#!/usr/bin/ruby
require 'cgi'

cgi = CGI.new

puts "Cache-Control: no-cache\n"
puts "Content-type: text/html\n\n"
puts "<html><head><title>General Echo</title></head>"
puts "<body>"
puts "<h1 align=center>General Request Echo</h1><hr/>\n"

puts "<p><b>HTTP Protocol: </b>#{ENV['SERVER_PROTOCOL']}</p>"
puts "<p><b>HTTP Method: </b>#{ENV['REQUEST_METHOD']}</p>"
puts "<p><b>Query String: </b>#{cgi.query_string}</p>"
puts "<p><b>Message Body: </b>#{cgi.params}</p>"


puts "</body>"
puts "</html>"