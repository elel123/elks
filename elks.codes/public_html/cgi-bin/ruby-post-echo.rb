#!/usr/bin/ruby
require 'cgi'

cgi = CGI.new

puts "Cache-Control: no-cache\n"
puts "Content-type: text/html\n\n"
puts "<html><head><title>POST Echo</title></head>"
puts "<body>"
puts "<h1 align=center>POST Message Body</h1><hr/>\n"

puts "<p><b>Message Body: </b></p>"

puts cgi.params.keys

puts "\n----------\n"

puts "<ul>"
cgi.params.each do |key, value|
    puts "<li> #{key} = #{value}</li>"
end

puts "</ul>"

puts "</body>"
puts "</html>"