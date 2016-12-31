import 'babel-polyfill'
import './stylus/index.styl'
import React from 'react'
import {render} from 'react-dom'
import ReactGA from 'react-ga'

import App from './components/app'

ReactGA.initialize('UA-28919359-3')

render(
  <App />, document.getElementById('root')
)
