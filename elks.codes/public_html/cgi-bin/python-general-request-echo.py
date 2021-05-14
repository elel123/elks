#!/usr/bin/env python3
import sys
import os

print("Cache-Control: no-cache")
print("Content-type: text/html")
print('''
<html><head><title>General Request Echo</title>

<script type="module" src="../scripts/collector.js"></script>\
</head>\
<body> \
<noscript><img src="../collector.php"></noscript><img id="flag" src="../images/favicon/favicon-16x16.png" width="1px" alt="">\

<h1 align=center>General Request Echo</h1> \
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