import ReactDOM from 'react-dom'
import React from 'react'
import Knob from './components/atoms/knob/knob.react'
import InputText from './components/atoms/input-text/input-text.react'
require('./themes/default/components/knob')

const onClick = (e) => {
  switch (e.type) {
    case 'click':
      console.log('CLICK');
      break
    case 'focus':
      console.log('FOCUS');
      break
    case 'blur':
      console.log('BLUR');
      break
  }
  console.log(e.type)
}
ReactDOM.render(
  <div>
    <Knob
      type='button'
      rel="'asda'"

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
