#!/usr/bin/env python3
import sys

print("Cache-Control: no-cache")
print("Content-type: text/html")


msg_body = sys.stdin.readlines()

print('''
<html><head><title>POST Message Body</title></head>\
<body><h1 align=center>POST Message Body</h1>\
<hr/>
<p><b>Message Body:</b> {} </p>
'''.format(msg_body))

print('<ul>')

for item in msg_body[0].split("&"):
    print(f"<li>{item}</li>")

print('</ul>')

print('</body></html>')