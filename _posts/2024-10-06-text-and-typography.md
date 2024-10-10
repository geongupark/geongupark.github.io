---
title: Virtual machine vs Container
description: A virtual machine type-1 is more secure than type-2 and a container
author: gus
date: 2024-10-06 11:13:00 +0800
categories: [TIL, Embedded]
tags: [virtual machine, hypervisor, container]
pin: false
math: true
mermaid: true
---

## Differences between Virtual Machines and Containers
---
A virtual machine is more secure than a container. A container is faster than a virtual machine.

| Item               | Virtual Machine           | Container                      |
| ------------------ | ------------------------- | ------------------------------ |
| **Isolation**      | Full OS                   | Application and dependencies   |
| **Virtualization** | Hardware-level            | OS-level                       |
| **Size**           | Heavy                     | Lightweight                    |
| **Boot Speed**     | Slow                      | Fast                           |
| **Resource Usage** | High                      | Low                            |
| **Compatibility**  | Different OSs             | Host OS kernel shared          |
| **Use Case**       | System isolation, testing | Fast deployment, microservices |
| **Tools**          | Hypervisor                | Docker, Kubernetes             |

## Can the container replace the virtual machine?
---
> Half of it is correct! A container can replace a `type-2` hypervisor but not a `type-1` hypervisor.
{: .prompt-info }
A virtual machine is implemented by a hypervisor. Let's see differences between hypervisor Type-1 and Type-2.

| Item             | Hypervisor Type-1              | Hypervisor Type-2              |
| ---------------- | ------------------------------ | ------------------------------ |
| **Installation** | Direct on hardware             | On existing OS                 |
| **Examples**     | VMware ESXi, Hyper-V, Xen      | VMware Workstation, VirtualBox |
| **Performance**  | High                           | Lower                          |
| **Stability**    | High                           | Affected by host OS            |
| **Use Case**     | Data centers, servers, vehicle | Personal, desktop              |
| **Overhead**     | Requires management tools      | No separate OS management      |
