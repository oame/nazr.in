import React, { Component } from 'react';
import ShortLinkForm from './ShortLinkForm';

const links = [
  { title: 'GitHub', url: 'https://github.com/oame/nazr.in' },
  { title: '@o_ame (コード)', url: 'https://twitter.com/o_ame' },
  { title: '@kahasina9 (ロゴ)', url: 'https://twitter.com/kahasina9' },
  {
    title: 'ZUN / 上海アリス幻樂団 (原作)',
    url: 'http://www16.big.or.jp/~zun/',
  },
];

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <a href={link.url}>{link.title}</a>
              </li>
            ))}
          </ul>
        </header>
        <div className="main">
          <img src="img/logo_doodle@2x.png" className="logo" />
          <ShortLinkForm />
        </div>
      </div>
    );
  }
}
