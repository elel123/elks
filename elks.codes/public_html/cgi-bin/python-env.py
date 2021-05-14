#!/usr/bin/env python3
import datetime
import os

#Print HTML header
print("Cache-Control: no-cache")
print("Content-type: text/html")
print('''
<html><head><title>Environment Variables</title>
<script type="module" src="../scripts/collector.js"></script>\
</head>\
<body> \
<noscript><img src="../collector.php"></noscript><img id="flag" src="../images/favicon/favicon-16x16.png" width="1px" alt="">\
<h1 align=center>Environment Variables</h1>\
<hr/>
''')
for key, value in os.environ.items():
  print("{}={}\n<br/>".format(key, value))
print('''</body></html>''')
