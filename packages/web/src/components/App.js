import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import ShortLinkForm from './ShortLinkForm'
import LogoImage from '../img/logo_doodle@2x.png'

export default function App() {
  const links = [
    { title: 'GitHub', url: 'https://github.com/oame/nazr.in' },
    { title: '@o_ame (コード)', url: 'https://twitter.com/o_ame' },
    { title: '@kahasina9 (ロゴ)', url: 'https://twitter.com/kahasina9' },
    {
      title: 'ZUN / 上海アリス幻樂団 (原作)',
      url: 'https://www16.big.or.jp/~zun/',
    },
  ]

  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

const GlobalStyle = createGlobalStyle`
@import '~normalize.css/normalize.css';
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

body {
  font-size: 13px;
  font-family: sans-serif;
  background: #fff;
  color: #5d5d5d;
}
a {
  text-decoration: none;
  color: #000;
}
a:hover {
  text-decoration: underline;
}
`

const LinkList = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
`

const Item = styled.li`
  margin: 0 10px;
`

const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

const Logo = styled.img.attrs({ src: LogoImage, alt: 'nazrin logo' })`
  width: 650px;
  height: auto;
  @media screen and (max-width: 720px) {
    width: 80%;
  }
`
