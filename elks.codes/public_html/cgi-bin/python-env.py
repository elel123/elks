  #!/usr/bin/env python3
import cgitb
import datetime
import os
import json

#Print HTML header
print("Cache-Control: no-cache")
print("Content-type: text/html")
# print('''
# <html><head><title>Environment Variables</title></head>\
# <body><h1 align=center>Environment Variables</h1>\
# <hr/> </body></html>''')
print('''
<html><head><title>Hello CGI World</title></head>\
<body><h1 align=center>Hello HTML World</h1>\
<hr/>
Hello World<br/>
This program was generated at: {}\n<br/>
Your current IP address is: {}<br/>
</body></html>
'''.format(datetime.datetime.now(), os.environ['REMOTE_ADDR']))
# for key, value in os.environ.items():
#     print("{}={}\n<br/>".format(key, value))
