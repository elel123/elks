#!/usr/bin/env python3
import os

from http import cookies
import uuid
import shelve


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
<html><head><title>Python Session Destroyed</title> \
<script type="module" src="../scripts/collector.js"></script>\
</head>\
<body> \
<noscript><img src="../collector.php"></noscript><img id="flag" src="../images/favicon/favicon-16x16.png" width="1px" alt="">\
<h1 align=center>Python Sessions Destroyed</h1>\
<hr/>
''')


# Check if username is stored in session 
session = shelve.open(f"/tmp/.session/python_sess", writeback=True)

if session_id in session:
  del session[session_id]

session.close() 



print("<a href=\"/cgi-bin/python-sessions-1.py\">Session Page 1</a><br/>")
print("<a href=\"/cgi-bin/python-sessions0.py\">Session Page 2</a><br/>")
print("<a href=\"../hw2/python-cgiform.html\">Python CGI Form</a><br />")

print('''
</body>
</html>
''')
