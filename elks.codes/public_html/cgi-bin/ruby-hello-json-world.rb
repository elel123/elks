#!/usr/bin/ruby
require 'json'

time = Time.new

json = '{"title":"Hello, Ruby!", "heading":"Amrit, Elton, and Kelly were here - Hello Ruby", "message":"' + time.inspect + '", "IP":"' + ENV['REMOTE_ADDR'] + '"}'

puts JSON.parse(json)