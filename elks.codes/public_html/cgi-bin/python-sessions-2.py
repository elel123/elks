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
  cookies = cookie.SimpleCookie(os.environ['HTTP_COOKIE'])

  # Python session id cookie not found, set one
  if PY_SESSION_COOKIE not in cookies:
    session_id = str(uuid.uuid1())
    cookies[PY_SESSION_COOKIE] = session_id

    print(cookie)  # Set-Cookie 
  else: 
    session_id = cookies[PY_SESSION_COOKIE]


  
print('''
<html><head><title>Python Sessions </title></head>\
<body><h1 align=center>Python Sessions Page 2</h1>\
<hr/>
''')


# Check if username is stored in session 
session = shelve.open(f"/tmp/.session/sess_{session_id}", writeback=True)

name = session.get('name')
if 'name' in session: # name is stored in session 
  print(f"<p><b>Name:</b> {name}</p>")
else:  # Name is not stored in session
  print("<p><b>Name:</b> You do not have a name set </p>")

session.close() 



print("<br /><br/>") 
print("<a href=\"/cgi-bin/python-sessions-1.py\">Session Page 1</a><br/>")
print("<a href=\"../hw2/python-cgiform.html\">Python CGI Form</a><br />")
print("<form style=\"margin-top:30px\" action=\"/cgi-bin/python-destroy-session.py\" method=\"get \">")
print("</form>")

print('''
</body>
</html>
''')
