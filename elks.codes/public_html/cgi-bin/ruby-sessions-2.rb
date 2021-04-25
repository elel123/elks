#!/usr/bin/ruby

require 'cgi'
require 'cgi/session'

cgi = CGI.new("html4")


sess = CGI::Session.new(cgi)

cookie = CGI::Cookie.new('name' => 'mycookie', 'sess_id' => sess.session_id)

#Save the cookie
cgi.out("cookie" => cookie, "Cache-Control" => "no-cache", "type" => "text/html") { "" }

puts "<html>"
puts "<head>"
puts "<title>Ruby Sessions</title>"
puts "</head>"
puts "<body>"

puts "<h1>Ruby Sessions Page 2</h1>"

puts "<pre>"

puts

puts sess.session_id

# puts "Session ID: #{sess["ID"]}"

puts "Session 'saved': #{sess['saved']}"



sess.close

# if ($name){
# 	puts("<p><b>Name:</b> $name")
# }else{
# 	puts "<p><b>Name:</b> You do not have a name set</p>"
# }

puts "</pre>"
puts "<br/><br/>"
puts "<a href=\"/cgi-bin/ruby-sessions-1.rb\">Session Page 1</a><br/>"
puts "<a href=\"../hw2/ruby-cgiform.html\">Ruby CGI Form</a><br />"
puts "<form style=\"margin-top:30px\" action=\"/cgi-bin/ruby-destroy-session.rb\" method=\"get\">"
puts "<button type=\"submit\">Destroy Session</button>"
puts "</form>"

puts "</body>"
puts "</html>"