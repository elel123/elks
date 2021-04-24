#!/usr/bin/ruby

time = Time.new

puts "Cache-Control: no-cache\n"
puts "Content-type: text/html\n\n"
puts "<html><head><title>Hello CGI World</title></head>"
puts "<body>"
puts "<h1 align=center>Hello HTML World</h1><hr/>\n"
puts "Hello World<br/>\n"
puts "This program was generated at:" + time.inspect + "\n<br/>"