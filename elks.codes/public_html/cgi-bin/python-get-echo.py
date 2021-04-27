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
<table> Formatted Query String:
'''.format(URL))

json = parse_qs(URL)

for item in json:
    print('''<tr><td>{}:</td><td>{}</td></tr>'''.format(item, json[item]))

print('''
</table>
</body>
</html>
''')