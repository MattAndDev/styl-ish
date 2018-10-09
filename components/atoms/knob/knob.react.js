const React = require('react')
const PropTypes = require('prop-types')
const name = 'knob'

const Knob = ({
  children,
  Elem,
  modifiers,
  extraClasses,
  ...properties
}) => (
  <Elem
    className={`${name} ${extraClasses} ${modifiers.map(mod => `${name}--${mod}`).join(' ')}`}
    {...properties}
  >
    {(!children) ? 'Knob' : children}
  </Elem>
)

Knob.defaultProps = {
  modifiers: ['primary'],
  Elem: 'button',
  extraClasses: ''
}

Knob.propTypes = {
  Elem: PropTypes.oneOf(['a', 'button']),
  extraClasses: PropTypes.string
}

module.exports = Knob
