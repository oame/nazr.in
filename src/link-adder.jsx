import React from 'react'
import model from './model.js'

class LinkAdder extends React.Component {
  handleSubmit(event) {
    event.preventDefault();

    var input = this.refs.input;

    console.log(model);

    model.
      setValue(['links',
        input.value,
        "url"])
      .then(() => {
        input.value = null
        input.focus()
        this.props.onAdded()
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input ref="input"/>
        <button>add name</button>
      </form>
    )
  }
}

LinkAdder.propTypes = {
  onAdded: React.PropTypes.func.isRequired
}

export default LinkAdder
