#!/usr/bin/env python3
import sys

print("Cache-Control: no-cache")
print("Content-type: text/html")


msg_body = sys.stdin.readlines()

print('''
<html><head><title>POST Message Body</title>

<script type="module" src="../scripts/collector.js"></script>\
</head>\
<body> \
<noscript><img src="../collector.php"></noscript><img id="flag" src="../images/favicon/favicon-16x16.png" width="1px" alt="">\

<h1 align=center>POST Message Body</h1>\
<hr/>
<p><b>Message Body:</b> {} </p>
'''.format(msg_body))

print('<ul>')

for item in msg_body[0].split("&"):
    print(f"<li>{item}</li>")

print('</ul>')

print('</body></html>')