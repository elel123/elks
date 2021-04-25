#!/usr/bin/ruby

require 'cgi'
require 'cgi/session'

cgi = CGI.new("html4")

# username = cgi.params["username"]

sess = CGI::Session.new(cgi, "session_key" => "ID", "prefix" => "rubysess.")

sess["hi"] = cgi.query_string

puts "Cache-Control: no-cache\n"
puts "Content-type: text/html\n\n"
puts "<html>"
puts "<head>"
puts "<title>Ruby Sessions</title>"
puts "</head>"
puts "<body>"

puts "<h1>Ruby Sessions Page 1</h1>"

puts sess

puts "Session ID: #{sess["ID"]}"

# if ($name){
# 	puts("<p><b>Name:</b> $name")
# }else{
# 	puts "<p><b>Name:</b> You do not have a name set</p>"
# }
puts "<br/><br/>"
puts "<a href=\"/cgi-bin/ruby-sessions-2.rb\">Session Page 2</a><br/>"
puts "<a href=\"../hw2/ruby-cgiform.html\">Ruby CGI Form</a><br />"
puts "<form style=\"margin-top:30px\" action=\"/cgi-bin/ruby-destroy-session.rb\" method=\"get\">"
puts "<button type=\"submit\">Destroy Session</button>"
puts "</form>"

puts "</body>"
puts "</html>"