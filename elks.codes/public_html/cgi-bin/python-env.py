  #!/usr/bin/env python3
import cgitb
import datetime
import os
import json

#Print HTML header
cgitb.enable()
print("Cache-Control: no-cache")
print("Content-type: text/html")
print('''
<html><head><title>Environment Variables</title></head>\
<body><h1 align=center>Environment Variables</h1>\
<hr/> </body></html>''')
# for key, value in os.environ.items():
#     print("{}={}\n<br/>".format(key, value))
