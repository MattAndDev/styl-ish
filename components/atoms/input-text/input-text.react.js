const React = require('react')
const PropTypes = require('prop-types')
const name = 'text-input'

const InputText = ({
  modifiers,
  extraClasses,
  ...properties
}) => (
  <input
    className={`${name} ${extraClasses} ${modifiers.map(mod => `${name}--${mod}`).join(' ')}`}
    {...properties}
  />
)

InputText.defaultProps = {
  modifiers: ['primary'],
  extraClasses: ''
}

InputText.propTypes = {
  properties: PropTypes.object,
  extraClasses: PropTypes.string
}

module.exports = InputText
