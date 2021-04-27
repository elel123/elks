#!/usr/bin/env python3
import sys
import os

print("Cache-Control: no-cache")
print("Content-type: text/html")
print('''
<html><head><title>General Request Echo</title></head> \
<body><h1 align=center>General Request Echo</h1> \
<hr/>
<table>
<tr><td>Protocol:</td><td>{}</td></tr>
<tr><td>Method:</td><td>{}</td></tr>
<tr><td>Message Body:</td><td> {}</td></tr>
</body>
</html>
'''.format(os.environ['SERVER_PROTOCOL'], os.environ['REQUEST_METHOD'], sys.stdin.readlines()))