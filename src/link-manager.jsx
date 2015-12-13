import React from 'react'
import ReactDom from 'react-dom'
import LinkAdder from './link-adder.jsx'
import LinksList from './links-list.jsx'

class LinkManager extends React.Component {
  handleLinkAdded() {
    this.refs.linksList.update()
  }

  render () {
    return(
      <div>
        <LinkAdder onAdded={this.handleLinkAdded.bind(this)}/>
        <LinksList ref="linksList"/>
      </div>
    )
  }
}

ReactDom.render(
  <LinkManager/>, document.querySelector('#root'))
