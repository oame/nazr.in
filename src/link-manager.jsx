import React from 'react';
import ReactDom from 'react-dom';
import LinkAdder from './link-adder.jsx';
import model from './model';

class LinkManager extends React.Component {
  handleLinkAdded(e) {
    console.log(e);
  }

  render() {
    return(
      <div>
        <LinkAdder onAdded={::this.handleLinkAdded}/>
      </div>
    );
  }
}

ReactDom.render(
  <LinkManager/>, document.querySelector('#root')
);
