<template>
  <div class="app">
    <knob />
  
  </div>
</template>
<script>
import Knob from './components/atoms/knob/knob.vue.js'
// import InputText from './components/atoms/input-text/input-text.vue'
// import Dropdown from './components/atoms/dropdown/dropdown.vue'
export default {
  name: 'App',
  components: {
    Knob
    // Knob, InputText, Dropdown
  },
  data () {
    return {
      disabled: false
    }
  },
  methods: {
    onClick (e){
      console.log('clicklcik');
      this.disabled = true
    },
    onBlur (e){
      this.disabled = false
    }
  },
  computed: {
    btnModifiers () {
      let mods = ['primary']
      if (this.disabled) {
        mods.push('disabled')
      }
      return mods
    }
  }
}
</script>
