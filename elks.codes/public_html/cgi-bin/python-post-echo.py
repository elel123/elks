#!/usr/bin/env python3
import sys

print("Cache-Control: no-cache")
print("Content-type: text/html")
print('''
<html><head><title>POST Message Body</title></head>\
<body><h1 align=center>POST Message Body</h1>\
<hr/>
Message Body: {} <br/>
</body>
</html>
'''.format(sys.stdin.readlines()))