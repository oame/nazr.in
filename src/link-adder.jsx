import React from 'react';
import model from './model';

class LinkAdder extends React.Component {
  static propTypes = {};

  handleSubmit(event) {
    event.preventDefault();

    const input = this.refs.input;

    model.call([
      'links', 'push'
    ], input.value).then((e) => {
      var nazrinURL = 'http://nazr.in/' + e.json.links[e.json.links.length - 1].hash;
      input.value = nazrinURL;
      input.focus();
    });
  }

  render() {
    return (
      <form onSubmit={:: this.handleSubmit}>
        <input ref="input" placeholder="Type your URL"/>
        <button>Shorten</button>
      </form>
    );
  }
}

export default LinkAdder
