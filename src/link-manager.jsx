import React from 'react';
import ReactDom from 'react-dom';
import LinkAdder from './link-adder.jsx';
import './style.css';

class LinkManager extends React.Component {
  handleLinkAdded(e) {
    console.log(e);
  }

  render() {
    return(
      <div>
        <img src="image/nazrin_logo.png" className="logo" />
        <LinkAdder onAdded={::this.handleLinkAdded}/>
      </div>
    );
  }
}

ReactDom.render(
  <LinkManager/>, document.querySelector('#root')
);
