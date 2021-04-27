#!/usr/bin/env python3
import sys

print("Cache-Control: no-cache")
print("Content-type: text/html")


msg_body = sys.stdin.readlines()

print('''
<html><head><title>POST Message Body</title></head>\
<body><h1 align=center>POST Message Body</h1>\
<hr/>
Message Body: {} <br/>
'''.format(msg_body))

print('<ul>')

for item in msg_body.split("&"):
    print(f"<li>{item}</li>")

print('</ul>')

print('</body></html>')