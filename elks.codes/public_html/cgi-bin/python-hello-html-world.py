#!/usr/bin/env python3
import datetime
import os

#Print HTML header
print('''Cache-Control: no-cache\n
Content-type: text/html\n\n
<html><head><title>Hello CGI World</title></head>\<body><h1 align=center>Hello HTML World</h1>\<hr/>\n
Hello World<br/>\n
</body></html>
''')
# print("Content-type: text/html\n\n")
# print("<html><head><title>Hello CGI World</title></head>\<body><h1 align=center>Hello HTML World</h1>\<hr/>\n")

# print("Hello World<br/>\n")
#  print("This program was generated at: {}\n<br/>".format(datetime.datetime.now()))
#  print("Your current IP address is: {}<br/>".format(os.environ['REMOTE_ADDR']))
 
# Print HTML footer
print("</body></html>")