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
<tbody>
<tr><td><b>Protocol:</b></td><td>{}</td></tr>
<tr><td><b>Method:</b></td><td>{}</td></tr>
<tr><td><b>Query String:</b></td><td>{}</td></tr>
<tr><td><b>Message Body:</b></td><td> {}</td></tr>
</tbody>
</table>
'''.format(os.environ['SERVER_PROTOCOL'], os.environ['REQUEST_METHOD'], os.environ['QUERY_STRING'], sys.stdin.readlines()))




print("</body></html>")