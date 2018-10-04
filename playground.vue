<template>
  <div class="app">
    <knob 
      type="button"
      :modifiers="btnModifiers"
      @click.native="onClick"
    >
      A
    </knob>
    <input-text 
      placeholder="wuto"
      :modifiers="btnModifiers"
      @blur.native="onBlur"
      @focus.native="onClick"
    />
  </div>
</template>
<script>
const Knob = require('./components/atoms/knob/knob.vue')
const InputText = require('./components/atoms/input-text/input-text.vue')
export default {
  name: 'App',
  components: {
    Knob, InputText
  },
  data () {
    return {
      disabled: false
    }
  },
  methods: {
    onClick (e){
      this.disabled = true
    },
    onBlur (e){
      console.log('adad');
      this.disabled = false
    }
  },
  computed: {
    btnModifiers () {
      let mods = []
      if (this.disabled) {
        mods.push('disabled')
      }
      return mods
    }
  }
}
</script>
