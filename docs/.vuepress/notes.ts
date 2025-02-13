import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const demoNote = defineNoteConfig({
  dir: 'demo',
  link: '/demo',
  sidebar: 'auto',
})  

const quartzNote = defineNoteConfig({
  dir: 'quartz',
  text: 'Quartz框架',
  link: '/quartz/',
  sidebar: [
    {
      text: '概述',
      link: 'README.md'
    },
    {
      text: 'Quartz教程',
      prefix: 'guide', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
      items: 'auto',
    },
  ],
})  

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [demoNote, quartzNote],
})
