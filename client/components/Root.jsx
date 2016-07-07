import React, {PropTypes} from 'react'

import ShortLinkForm from './ShortLinkForm'

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <header>
          <ul>
            <li><a href="https://github.com/oame/nazr.in">GitHub</a></li>
            <li><a href="https://twitter.com/o_ame">@o_ame</a></li>
            <li><a href="https://twitter.com/kahasina9">@kahasina9 (Illustration)</a></li>
            <li><a href="http://www16.big.or.jp/~zun/">上海アリス幻樂団 (原作)</a></li>
          </ul>
        </header>
        <div className="main">
          <img src="img/logo_doodle@2x.png" className="logo"/>
          <ShortLinkForm/>
        </div>
      </div>
    )
  }
}
