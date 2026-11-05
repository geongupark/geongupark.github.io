---
title: History of linux graphics (x11, drm/kms, wayland)
description: Summarize history of linux graphics (x11, drm/kms, wayland)
date: 2026-11-05
category: TIL
tags:
  - Linux
  - Graphics
series: Linux
draft: false
---

### 1. X11

> X11 was the traditional way to display graphics on Linux.

- X11: A graphics protocol
- It consists of an X Server and a Window Manager.

```
Client → (X Server + Window Manager) → Display Driver → H/W
```

#### 2. DRM/KMS

> GPU and display management moved toward kernel-space interfaces.

- DRM: Provides GPU access and buffer management
- KMS: Controls display resolution and output
- X Server adopted DRM/KMS.

```
Client → X Server → DRM/KMS → H/W
```

#### 3. Wayland

> X11 had a complex architecture, so Wayland was introduced as a simpler alternative.

- Wayland: A protocol between clients and a compositor
- Weston: An implementation of a Wayland compositor
- Compositor: Manages windows, composites buffers, and controls display output

```
Client → Wayland Compositor → DRM/KMS → H/W
```

#### Wrap Up: Linux Graphics Architecture

- Both X11 and Wayland follow a client-server architecture.

```
[X11]
Client → X Server ↔ WM/Compositor
                ↓
              DRM/KMS
                ↓
              Display

--

[Wayland]
Client ──Buffer (wl_buffer, DMA-BUF, ...)──→ Weston (Compositor)
                                                ↓
                                              DRM/KMS
                                                ↓
                                              Display
```
