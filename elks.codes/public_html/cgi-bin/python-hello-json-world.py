#!/usr/bin/env python3
import datetime
import os

#Print HTML header
print("Cache-Control: no-cache")
print("Content-type: application/json")
print('''
{"message": "Hello World",\n
"date": "{}",\n
"currentIP": "{}"\n}\n
'''.format(datetime.datetime.now(), os.environ['REMOTE_ADDR']))