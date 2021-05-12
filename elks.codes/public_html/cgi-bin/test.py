#!/usr/bin/env python3

import shelve

session_id = 12345
f = shelve.open(f"/tmp/.session/sess_{session_id}")
f['a'] = 23
print(f['a'])
f.close()
