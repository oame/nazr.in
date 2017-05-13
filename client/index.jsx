import 'babel-polyfill'
import './stylus/index.styl'
import React from 'react'
import { render } from 'react-dom'
import ReactGA from 'react-ga'
import Raven from 'raven-js'

import App from './components/app'

ReactGA.initialize('UA-28919359-3')
Raven.config(
  'https://1900792671ca4e2f9cf697717e07ff41@sentry.io/143585'
).install()

render(<App />, document.getElementById('root'))
