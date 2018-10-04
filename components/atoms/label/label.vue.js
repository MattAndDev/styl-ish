import mixins from '../mixins'

export default {
  name: 'labeler',
  mixins: [mixins.classes, mixins.events],
  render (createElement) {
    return createElement(
      'label',
      {
        class: this.classes,
        on: { ...this.events }
      },
      this.$slots.default
    )
  },
  props: {
    text: {
      type: String,
      default: 'Button'
    }
  }
}
