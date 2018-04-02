import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import Raven from 'raven-js'

import './index.css'
import App from './App'

ReactGA.initialize('UA-28919359-3')
Raven.config('https://1900792671ca4e2f9cf697717e07ff41@sentry.io/143585').install()

ReactDOM.render(<App />, document.getElementById('root'))
