import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';

import ShortLinkForm from './ShortLinkForm';
import LogoImage from '../img/logo_doodle@2x.png';

export default function App() {
  const links = [
    {title: 'GitHub', url: 'https://github.com/oame/nazr.in'},
    {title: '@o_ame (コード)', url: 'https://twitter.com/o_ame'},
    {title: '@kahasina9 (ロゴ)', url: 'https://twitter.com/kahasina9'},
    {
      title: 'ZUN / 上海アリス幻樂団 (原作)',
      url: 'https://www16.big.or.jp/~zun/',
    },
  ];

  return (
    <>
      <GlobalStyle />
      <header>
        <LinkList>
          {links.map((link, index) => (
            <Item key={index}>
              <a href={link.url}>{link.title}</a>
            </Item>
          ))}
        </LinkList>
      </header>
      <Main>
        <Logo />
        <ShortLinkForm />
      </Main>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: #fff;
  color: #5d5d5d;
  font-family: sans-serif;
  font-size: 0.4em;
}

a {
  text-decoration: none;
  color: #000;
}

a:hover {
  text-decoration: underline;
}
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const Logo = styled.img.attrs({src: LogoImage, alt: 'nazrin logo'})`
  width: 650px;
  height: auto;
  @media screen and (max-width: 800px) {
    width: 80%;
  }
`;

const LinkList = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: baseline;
`;

const Item = styled.li`
  margin: 0 10px;
`;
