#!/usr/bin/env python3
from urllib.parse import urlparse, parse_qs
import os

#URL='https://someurl.com/with/query_string?i=main&mode=front&sid=12ab&enc=+Hello'

print("Cache-Control: no-cache")
print("Content-type: text/html\n")
print('''
<html><head><title>GET query string</title></head>\
<body><h1 align=center>GET query string</h1>\
<hr/>
Raw query string: {} <br/><br/>
<table> Formatted Query String:
'''.format(os.environ['QUERY_STRING']))

<<<<<<< HEAD
# parsed_url = urlparse(URL)
# json = parse_qs(parsed_url.query)
=======
#parsed_url = urlparse(URL)
json = parse_qs(URL)
>>>>>>> aeea7e0a5262ea79b6a6f033ca1a5f2027ca64fb

# for item in json:
#     print('''<tr><td>{}:</td><td>{}</td></tr>'''.format(item, json[item]))

print('''
</table>
</body>
</html>
''')
