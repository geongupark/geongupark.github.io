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
