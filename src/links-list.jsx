import React from 'react'
import model from './model.js'

class LinksList extends React.Component {
  constructor() {
    super()
    this.state = {links: {}}
  }

  componentWillMount() {
    this.update()
  }

  render() {
    var links = Object.keys(this.state.links).map(idx => {
      return <li key={idx}>{this.state.links[idx].url} http://nazr.in/{this.state.links[idx].hash}</li>
    })
    return (
      <ul>{links}</ul>
    )
  }

  update() {
    model
      .getValue(['links', 'length'])
      .then(length => model.get(['links', {from: 0, to: length-1}, ['url', 'hash']]))
      .then(response => this.setState({links: response.json.links}));
  }
}

export default LinksList
