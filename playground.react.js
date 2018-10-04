import ReactDOM from 'react-dom'
import React from 'react'
import Knob from './components/atoms/knob/knob.react'
import InputText from './components/atoms/input-text/input-text.react'
require('./themes/default/components/knob')

const onClick = (e) => {
  console.log(e)
}
ReactDOM.render(
  <div>
    <Knob
      type='button'
      onClick={onClick}
    >
      Hello
    </Knob>
    <InputText
      placeholder='wuto'
    />
  </div>,
  document.getElementById('React')
)
