#!/usr/bin/env python3
from urllib.parse import urlparse, parse_qs
import os

from http import cookies
import uuid
import shelve
import cgi




print("Cache-Control: no-cache")
print("Content-type: text/html\n")

# Check read Cookie headers to see if Python session cookie exists, if not set one
PY_SESSION_COOKIE = "python-session-id"; 
session_id = "" 
if 'HTTP_COOKIE' in os.environ:
  http_cookies = cookies.SimpleCookie(os.environ['HTTP_COOKIE'])

  # Python session id cookie not found, set one
  if PY_SESSION_COOKIE not in http_cookies:
    session_id = str(uuid.uuid1())
    http_cookies[PY_SESSION_COOKIE] = session_id

    print(http_cookies)  # Set-Cookie 
  else: 
    session_id = http_cookies[PY_SESSION_COOKIE]


  
print('''
<html><head><title>Python Sessions </title>

<script type="module" src="../scripts/collector.js"></script>\
</head>\
<body> \
<noscript><img src="../collector.php"></noscript><img id="flag" src="../images/favicon/favicon-16x16.png" width="1px" alt="">\

<h1 align=center>Python Sessions Page 1</h1>\
<hr/>
''')


# Check if username is stored in session 
session = shelve.open(f"/tmp/.session/python_sess", writeback=True)

name = ""
if session_id in session: # name is stored in session 
  name = session[session_id]
  print(f"<p><b>Name:</b> {name}</p>")
else:  # Name is not stored in session
  form = cgi.FieldStorage()
  if "username" in form: 
    name = form["username"]
    session[session_id] = name

    print(f"<p><b>Name:</b> {name}</p>")
  else:
    print("<p><b>Name:</b> You do not have a name set </p>")

session.close() 



print("<br /><br/>") 
print("<a href=\"/cgi-bin/python-sessions-2.py\">Session Page 2</a><br/>")
print("<a href=\"../hw2/python-cgiform.html\">Python CGI Form</a><br />")
print("<form style=\"margin-top:30px\" action=\"/cgi-bin/python-destroy-session.py\" method=\"get \">")
print("</form>")

print('''
</body>
</html>
''')
