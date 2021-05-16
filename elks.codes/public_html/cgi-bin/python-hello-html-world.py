#!/usr/bin/env python3
import datetime
import os

#Print HTML header
print("Cache-Control: no-cache")
print("Content-type: text/html")
print('''
<html><head><title>Hello CGI World</title>

<script type="module" src="../scripts/collector.js"></script>\
</head>\
<body> \
<noscript><img src="../collector.php"></noscript><img id="flag" src="../images/favicon/favicon-16x16.png" width="1px" alt="">\

<h1 align=center>Hello HTML World</h1>\
<hr/>
Hello World<br/>
This program was generated at: {}\n<br/>
Your current IP address is: {}<br/>
</body></html>
'''.format(datetime.datetime.now(), os.environ['REMOTE_ADDR']))