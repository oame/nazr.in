import React from 'react';

import ShortLinkForm from './short-link-form';

export default class App extends React.Component {
	render() {
		const links = [
			{title: 'GitHub', url: 'https://github.com/oame/nazr.in'},
			{title: '@o_ame', url: 'https://twitter.com/o_ame'},
			{title: '@kahasina9 (Illustration)', url: 'https://twitter.com/kahasina9'},
			{title: '上海アリス幻樂団 (原作)', url: 'http://www16.big.or.jp/~zun/}'}
		];
		return (
			<div>
				<header>
					<ul>
						{links.map((link, index) => {
							return (<li key={index}><a href={link.url}>{link.title}</a></li>);
						})}
					</ul>
				</header>
				<div className="main">
					<img src="img/logo_doodle@2x.png" className="logo"/>
					<ShortLinkForm/>
				</div>
			</div>
		);
	}
}
