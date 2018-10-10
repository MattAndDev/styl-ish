/* eslint-disable react/react-in-jsx-scope, react/no-unknown-property, react/prop-types */
module.exports = {
  functional: true,
  render: (h, {
    props,
    children,
    attrs
  }) => (
    <input value={props.defaultValue} />
  ),
  props: {
    defaultValue: {
      type: String,
      default: 'ads'
    }
  }
}
