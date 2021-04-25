#!/usr/bin/ruby
require 'cgi'

cgi = CGI.new

puts "Cache-Control: no-cache\n"
puts "Content-type: text/html\n\n"
puts "<html><head><title>POST Echo</title></head>"
puts "<body>"
puts "<h1 align=center>POST Message Body</h1><hr/>\n"

puts "<p><b>Message Body: </b></p>"


puts  cgi.params.inspect

puts "<p>"
cgi.params.each { |var|
    puts var + "<br/>"
}

puts "</p>"

puts "</body>"
puts "</html>"