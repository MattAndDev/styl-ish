const mixins = require('../mixins')
const name = 'knob'

module.exports = {
  funtional: true,
  mixins: [mixins.classes],
  props: {
    Elem: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'a', 'span'].includes(value)
    }
  },
  render (createElement, context) {
    return createElement(
      this.Elem,
      {
        on: { ...this.events },
        class: `${name} ${this.modifiers.map(mod => `${name}--${mod}`).join(' ')} ${this.extraClasses}`
      },
      this.$slots.default || 'Knob'
    )
  }
}
