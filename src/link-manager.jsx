import React from 'react'
import ReactDom from 'react-dom'
import LinkAdder from './link-adder.jsx'
import LinksList from './links-list.jsx'
import model from './model'

class LinkManager extends React.Component {
  componentDidMount() {
    model.get('urls').then((data) => {
      console.log(data);
    });
  }

  handleLinkAdded() {
    this.refs.linksList.update()
  }

  render () {
    return(
      <div>
        <LinkAdder onAdded={::this.handleLinkAdded}/>
        <LinksList ref="linksList"/>
      </div>
    )
  }
}

ReactDom.render(
  <LinkManager/>, document.querySelector('#root')
)
