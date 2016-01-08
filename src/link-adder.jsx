import React from 'react';
import model from './model';

class LinkAdder extends React.Component {
  static propTypes = {
    onAdded: React.PropTypes.func.isRequired
  };

  handleSubmit(event) {
    event.preventDefault();

    const input = this.refs.input;

    model
      .call(
        ['links', 'push'],
        input.value)
      .then((e) => {
        console.log(e);
        input.value = null;
        input.focus();
        this.props.onAdded();
      });
  }

  render() {
    return(
      <form onSubmit={::this.handleSubmit}>
        <input ref="input" />
        <button>Shorten</button>
      </form>
    );
  }
}

export default LinkAdder
