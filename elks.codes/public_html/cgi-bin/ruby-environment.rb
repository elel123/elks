#!/usr/bin/ruby

puts "Cache-Control: no-cache\n"
puts "Content-type: text/html\n\n"
puts "<html><head><title>Environment Variables</title>"

puts "<script type=\"module\" src=\"../scripts/collector.js\"></script>"
puts "</head>"
puts "<body>"
puts "<noscript><img src=\"../collector.php\"></noscript><img id=\"flag\" src=\"../images/favicon/favicon-16x16.png\" width=\"1px\" alt=\"\">"

puts "<h1 align=center>Environment Variables from Amrit, Elton, and Kelly</h1><hr/>\n"

puts "<p>"
ENV.keys.each { |env|
    puts "<b>" + env + ":</b> " + ENV[env] + "<br/>"
}

puts "</p>"

puts "</body>"
puts "</html>"