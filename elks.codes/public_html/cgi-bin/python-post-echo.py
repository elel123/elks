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

try:
    for item in msg_body[0].split("&"):
        print(f"<li>{item}</li>")
except Exception as e:
    print(f"<pre>{e}</pre>")

print('</ul>')

print('</body></html>')