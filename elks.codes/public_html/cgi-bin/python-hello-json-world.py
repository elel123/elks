#!/usr/bin/env python3
import cgitb
import datetime
import os
import json

#Print HTML header
# print("Cache-Control: no-cache") 
cgitb.enable()
print("Content-Type: application/json")
print()
# print("<TITLE>CGI script output</TITLE>")
# print("<H1>This is my first CGI script</H1>")
# print("Hello, world!")
date = datetime.datetime.now()
# print(os.environ["REMOTE_ADDR"])
#print("Content-type: application/json")
x = {
    "message": "Hello World",
    "date": str(date),
    "currentIP": str(os.environ["REMOTE_ADDR"])
}
print(json.dumps(x))