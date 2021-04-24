#!/usr/bin/ruby

puts "Cache-Control: no-cache\n"
puts "Content-type: text/html\n\n"
puts "<html><head><title>Environment Variables</title></head>"
puts "<body>"
puts "<h1 align=center>Environment Variables from Amrit, Elton, and Kelly</h1><hr/>\n"

ENV.keys.each { |env|
    puts "<p><b>" + env + "</b>: " + ENV[env] + "</p>"
}

puts "</body>"
puts "</html>"