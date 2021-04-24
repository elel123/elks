#!/usr/bin/ruby
require 'json'
require 'cgi'


time = Time.new
cgi = CGI.new



json = '{"title":"Hello, Ruby!", "heading":"Amrit, Elton, and Kelly were here - Hello Ruby", "message":"' + time.inspect + '", "IP":"' + ENV["REMOTE_ADDR"] + '"}'
json1 = '{"heading":"Amrit, Elton, and Kelly were here - Hello Ruby"}'
json2 = '{"message":"'+ time.inspect+'"}'
json3 = '{"IP":"' + 'ENV["REMOTE_ADDR"]' + '"}'

puts cgi.header("type" => "application/json")
puts ""
puts ({
    title: "Hello, Ruby!", 
    heading: "Amrit, Elton, and Kelly were here - Hello Ruby",
    message: time.inspect,
    IP: ENV["REMOTE_ADDR"]
}).to_json
