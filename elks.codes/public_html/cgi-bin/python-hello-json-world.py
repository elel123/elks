#!/usr/bin/env python3
import datetime
import os
import json

#Print HTML header
print("Cache-Control: no-cache")
print("Content-type: application/json")
x = {
    "message": "Hello World",
    "date": datetime.datetime.now(),
    "currentIP": os.environ['REMOTE_ADDR']
}
print(x)