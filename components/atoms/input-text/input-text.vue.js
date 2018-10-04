const mixins = require('../mixins')
const name = 'input-text'

module.exports = {
  funtional: true,
  name: name,
  mixins: [mixins.classes],
  render (createElement) {
    return createElement(
      'input',
      {
        domProps: {
          value: this.defaultValue
        },
        class: this.classes,
        on: {
          input: (e) => {
            this.$emit('input')
            this.value = e.target.value
          },
          ...this.events
        }
      }
    )
  },
  props: {
    defaultValue: {
      type: String,
      default: ''
    }
  }
}
