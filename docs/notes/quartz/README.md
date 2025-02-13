---
title: Quartz框架
createTime: 2025/02/12 16:18:57
permalink: /quartz/
---

## 什么是Quartz
Quartz是一个完全由Java编写的开源作业调度框架，在Java应用程序中为作业调度提供了简单却强大的机制。

## Quartz核心概念

1. **Job** 表示一个工作
2. **JobDetail** 表示一个具体的可执行的调度程序，Job 是这个可执行调度程序所要执行的内容，JobDetail还包含这个任务调度的方案和策略
3. **Trigger** 表示一个触发器，什么时候调用
4. **Scheduler** 表示一个调度容器，一个调度容器中可以注册多个JobDetail和Trigger。当JobDetail和Trigger组合后，就可以被Scheduler容器调度了。