#!/usr/bin/env python3
import datetime
import os

#Print HTML header
print("Cache-Control: no-cache\r\n")
print("Content-type: application/json\r\n\r\n")
print('''
{\n\t\"message\": \"Hello World\",\n
\t\"date\": \"{}\",\n
\t\"currentIP\": \"{}\"\n}\n
'''.format(datetime.datetime.now(), os.environ['REMOTE_ADDR']))