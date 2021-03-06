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

puts "<script type=\"module\" src=\"../scripts/collector.js\"></script>"
puts "</head>"
puts "<body>"
puts "<noscript><img src=\"../collector.php\"></noscript><img id=\"flag\" src=\"../images/favicon/favicon-16x16.png\" width=\"1px\" alt=\"\">"

puts "<h1>Ruby Sessions Page 1</h1>"

puts "<p>"

if cgi.params.has_key?("username") and cgi.params["username"][0] != ""
    # puts "not empty: #{cgi.params["username"]}</br>"
    sess["saved"] = cgi.params["username"]
end

puts


# puts "Session ID: #{sess["ID"]}"

if sess['saved'].inspect[2..-3].empty?
    puts "<b>Name:</b> You do not have a name set"
else 
    puts "<b>Name:</b> #{sess['saved'].inspect[2..-3]}"
end




sess.close


puts "</p>"
puts "<br/><br/>"
puts "<a href=\"/cgi-bin/ruby-sessions-2.rb\">Session Page 2</a><br/>"
puts "<a href=\"../hw2/ruby-cgiform.html\">Ruby CGI Form</a><br />"
puts "<form style=\"margin-top:30px\" action=\"/cgi-bin/ruby-destroy-session.rb\" method=\"get\">"
puts "<button type=\"submit\">Destroy Session</button>"
puts "</form>"

puts "</body>"
puts "</html>"