import Vue from 'vue'
import App from './playground'
require('./themes/default/components/knob')

const VM = new Vue({ // eslint-disable-line no-unused-vars
  el: '#Vue',
  components: { App },
  template: '<App/>',
  data: {
    message: 'Hello Vue!'
  }
})
