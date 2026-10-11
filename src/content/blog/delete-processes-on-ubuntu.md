---
title: Delete processes on Ubuntu
description: A cheat sheet to delete processes on Ubuntu
date: 2026-10-11
category: TIL
tags:
  - Linux
  - Ubuntu
  - Process
draft: false
---

# Remove processes on Ubuntu

* Check the processes you want to delete to avoid mistakes.
```
# Search process id with options
pgrep -af "port 8000"
pgrep -af "--reload"
pgrep -af "script.py"
pgrep -af "uvicorn"
```
* Delete proesses what you already checked.
```
# Kill processes
pkill -f "port 8000"
pkill -f "--host 0.0.0.0"
pkill -9 -f "main:app"
pkill -f "uvicorn.*8000"
```
