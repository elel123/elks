#!/usr/bin/ruby
require 'json'
require 'cgi'


time = Time.new
cgi = CGI.new


puts cgi.header("type" => "application/json")
puts ""
puts ({
    title: "Hello, Ruby (JSON)!", 
    heading: "Amrit, Elton, and Kelly were here - Hello Ruby",
    message: time.inspect,
    IP: ENV["REMOTE_ADDR"]
}).to_json
