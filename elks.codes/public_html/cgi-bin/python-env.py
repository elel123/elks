#!/usr/bin/env python3
import datetime
import os

#Print HTML header
print("Cache-Control: no-cache")
print("Content-type: text/html")
print('''
<html><head><title>Environment Variables</title></head>\
<body><h1 align=center>Environment Variables</h1>\
<hr/> </body></html>
'''.format(datetime.datetime.now(), os.environ['REMOTE_ADDR']))