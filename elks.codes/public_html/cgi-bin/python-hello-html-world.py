#!/usr/bin/env python3
import datetime
import os

#Print HTML header
print('''
Cache-Control: no-cache\n
Content-type: text/html\n\n
<html><head><title>Hello CGI World</title></head>\
<body><h1 align=center>Hello HTML World</h1>\
<hr/
Hello World<br/>
This program was generated at: a\n<br/>
Your current IP address is: {}<br/>
</body></html>
''')
# print("Cache-Control: no-cache\n")
# print("Content-type: text/html\n\n")
# print("<html><head><title>Hello CGI World</title></head>\
# <body><h1 align=center>Hello HTML World</h1>\
# <hr/>")

#  print("Hello World<br/>")
#  print("This program was generated at: {}\n<br/>".format('a'))
#  print("Your current IP address is: {}<br/>".format('a'))
 
#  # Print HTML footer
#  print("</body></html>")