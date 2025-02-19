import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'jackson',
  link: '/jackson/',
  sidebar: [
    {
      text: '概述',
      link: 'README.md'
    },
    {
      text: '基础知识',
      prefix: 'basics/', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
      items: 'auto',
    },
    {
      text: '定制功能',
      prefix: 'customization', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
      items: 'auto',
    },
    {
      text: '高级应用',
      prefix: 'advanced', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
      items: 'auto',
    },
  ],
})