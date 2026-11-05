---
title: History of linux graphics (x11, drm/kms, wayland)
description: Summarize history of linux graphics (x11, drm/kms, wayland)
date: 2026-11-05
category: TIL
tags:
  - Linux
  - Graphics
draft: true
---

#### 1. X11
* X11 : Graphics protocol
* It consists of X Server + Window Manager
> Client → (X Server + Window Manager) → Display Driver → H/W

#### Wrap up : Linux Graphics Architecture
* Basically, It is a client - server architecture

```
[X11]
Client → X Server ↔ WM/Compositor
                ↓
              DRM/KMS
                ↓
              Display

--

[Wayland]
Client ──Buffer(wl_buffer, dma-buf ...)──→ Weston (Compositor)
                         ↓
                       DRM/KMS
                         ↓
                       Display
```
