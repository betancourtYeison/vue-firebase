import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import { Resize } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  theme: {
    primary: '#0045cb',
    secondary: '#0058be',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
  directives:{
    Resize
  },
  options: {
    customProperties: true
  },
  iconfont: 'md',
})
