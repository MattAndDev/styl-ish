/* eslint-disable react/react-in-jsx-scope, react/no-unknown-property */
const mixins = require('../mixins-vue')
const name = 'knob'

export default {
  name: name,
  functional: true,
  mixins: [mixins.classes],
  props: {
    Elem: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'a', 'span'].includes(value)
    }
  },
  render: (h, {
    children,
    props,
    attrs
  }) => (
    <props.Elem
      class={`${name} ${props.extraClasses} ${props.modifiers.map(mod => `${name}--${mod}`).join(' ')}`}
      {...attrs}
    >
      {(!children) ? 'Knob' : children}
    </props.Elem>
  )
}
