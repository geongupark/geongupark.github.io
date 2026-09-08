---
title: A bout AOSP
description: AOSP consists of many Git repositories.
date: 2026-09-08
category: Android
tags:
  - android
  - AOSP
draft: false
---

## What is the AOSP?

AOSP (Android Open Source Project) is the raw, pure source code of the Android operating system maintained by Google.

- It is **not a single monolithic Git repository**.
- Instead, it consists of hundreds of modular Git repositories managed collectively via Google's Python-based wrapper tool, **`repo`**.

## **Why do we use AOSP?**

Commercial devices and embedded targets have drastically different requirements. AOSP allows you to build a tailor-made OS stack from the ground up using four core mechanisms:

- **`manifest.xml`**: A declarative blueprint that specifies exactly which Git repositories and branches to pull via `repo sync`. You download only the source trees relevant to your hardware platform.
- **`lunch`**: An environment command (`lunch <target>-<variant>`) that binds your target architecture (ARM64, x86_64), product profile (Automotive, Phone), and build variant (`userdebug`, `eng`) into global build flags.
- **`BoardConfig.mk` & `device.mk`**: The hardware recipe. These makefiles configure low-level architecture flags, kernel build parameters, vendor partition layouts, and graphic HAL properties (e.g., setting `ro.hardware.egl = angle`).
- **Soong & `Android.bp`**: The build engine. Soong parses blueprints (`Android.bp`) across modules to compile only the necessary binaries, HALs, and libraries, producing the final system images (`system.img`, `vendor.img`).

\`\`\`mermaid title=""

flowchart LR

    classDef default fill:#1f2430,stroke:#707a8c,stroke-width:1px,color:#ffffff;

    classDef note fill:#fff3cd,stroke:#ffeeba,stroke-width:1.5px,color:#856404;

    M["manifest.xml<br/>(repo sync)"] --> L["lunch Target<br/>(Build Env Setup)"]

    L --> D["device.mk & BoardConfig.mk<br/>(Hardware Spec & HAL Setup)"]

    D --> B["Soong & Android.bp<br/>(Module Compilation via m)"]

    B --> IMG["Custom Images<br/>(system.img / vendor.img)"]

    NOTE["Custom Android OS tailored for target hardware"]:::note

    IMG -.- NOTE

\`\`\`
