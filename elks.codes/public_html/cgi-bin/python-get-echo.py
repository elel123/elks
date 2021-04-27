#!/usr/bin/env python3
from urllib.parse import urlparse, parse_qs
import os

#URL='https://someurl.com/with/query_string?i=main&mode=front&sid=12ab&enc=+Hello'
URL = os.environ['QUERY_STRING']

print("Cache-Control: no-cache")
print("Content-type: text/html\n")
print('''
<html><head><title>GET query string</title></head>\
<body><h1 align=center>GET query string</h1>\
<hr/>
Raw query string: {} <br/><br/>
<p><b>Formatted Query String:</b></p>
'''.format(URL))

json = parse_qs(URL)

print("<ul>")

for item in json:
    print('''<li>{} : {}</li>'''.format(item, json[item][0]))

print("</ul>")

print('''
</body>
</html>
''')