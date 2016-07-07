import React, {PropTypes} from 'react'

import ShortLinkForm from './ShortLinkForm'

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <img src="image/nazrin_logo.png" className="logo"/>
        <ShortLinkForm/>
      </div>
    )
  }
}
