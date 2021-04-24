#!/usr/bin/ruby

puts "Cache-Control: no-cache\n"
puts "Content-type: text/html\n\n"
puts "<html><head><title>Environment Variables</title></head>"
puts "<body>"
puts "<h1 align=center>Environment Variables from Amrit, Elton, and Kelly</h1><hr/>\n"

puts "<p>"
ENV.keys.each { |env|
    puts "<b>" + env + ":</b> " + ENV[env] + "<br/>"
}

puts "</p>"

puts "</body>"
puts "</html>"