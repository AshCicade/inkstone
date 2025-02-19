import { defineNotesConfig } from 'vuepress-theme-plume';
import jackson from './notes/jackson';
import quartz from './notes/quartz';

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [ 
    jackson,
    quartz
  ]
})
