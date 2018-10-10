module.exports = {
  classes: {
    props: {
      extraClasses: {
        type: String,
        default: ''
      },
      modifiers: {
        type: Array,
        default: () => (['asdad'])
      }
    }
  }
}
