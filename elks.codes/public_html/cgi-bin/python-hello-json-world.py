#!/usr/bin/env python3
import cgitb
import datetime
import os
import json

#Print HTML header
cgitb.enable()
print("Content-Type: application/json")
print()
x = {
    "message": "Hello World",
    "date": str(date),
    "currentIP": str(os.environ["REMOTE_ADDR"])
}
print(json.dumps(x, indent=4))