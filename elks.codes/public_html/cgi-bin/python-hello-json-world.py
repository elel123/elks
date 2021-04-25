#!/usr/bin/env python3
import datetime
import os
import json

#Print HTML header
# print("Cache-Control: no-cache") 
date = datetime.datetime.now()
env = os.environ['REMOTE_ADDR']
#print("Content-type: application/json")
x = {
    "message": "Hello World",
    "date": date,
    "currentIP": env
}
print(json.dumps(x))