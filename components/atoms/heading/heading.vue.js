import mixins from '../mixins'

export default {
  name: 'heading',
  mixins: [mixins.classes, mixins.events],
  render (createElement) {
    return createElement(
      'h' + this.level,
      {
        class: this.classes,
        on: { ...this.events }
      },
      this.$slots.default,
      'Something'
    )
  },
  props: {
    level: {
      type: Number,
      default: 1
    }
  }
}
