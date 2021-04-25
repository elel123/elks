#!/usr/bin/ruby

require 'cgi'
require 'cgi/session'

cgi = CGI.new("html4")

# username = cgi.params["username"]

begin
    sess = CGI::Session.new(cgi, "session_key" => "test", 'new_session' => false)
    sess["No"] = "No"
rescue ArgumentError  # if no old session
    sess = CGI::Session.new(cgi, "session_key" => "test", 'new_session' => true)
    sess["Yes"] = "Yes"
end


puts "Cache-Control: no-cache\n"
puts "Content-type: text/html\n\n"
puts "<html>"
puts "<head>"
puts "<title>Ruby Sessions</title>"
puts "</head>"
puts "<body>"

puts "<h1>Ruby Sessions Page 1</h1>"

puts "<pre>"

if not cgi.query_string.empty?
    puts "query string\n"
    sess["hi"] = cgi.query_string
end

puts

puts sess.session_id
puts

# puts "Session ID: #{sess["ID"]}"

puts "Session 'hi': #{sess['hi']}"

puts "New Session: #{sess['Yes']}"
puts "Old Session: #{sess['No']}"

sess.update

sess.close

# if ($name){
# 	puts("<p><b>Name:</b> $name")
# }else{
# 	puts "<p><b>Name:</b> You do not have a name set</p>"
# }

puts "</pre>"
puts "<br/><br/>"
puts "<a href=\"/cgi-bin/ruby-sessions-2.rb\">Session Page 2</a><br/>"
puts "<a href=\"../hw2/ruby-cgiform.html\">Ruby CGI Form</a><br />"
puts "<form style=\"margin-top:30px\" action=\"/cgi-bin/ruby-destroy-session.rb\" method=\"get\">"
puts "<button type=\"submit\">Destroy Session</button>"
puts "</form>"

puts "</body>"
puts "</html>"