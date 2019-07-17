/* eslint {react/prop-types: off, react/no-array-index-key: off} */
import React, { Component } from 'react';

import Data from 'models/data';
import Middleware from 'models/middlewares';

export default class Liney extends Component {
  constructor(props) {
    super(props);
    this.state = { text: Data.getText() };
    this.handleType = this.handleType.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleType);
  }

  handleType(e) {
    e.preventDefault();
    Middleware.input(e);
    this.setState({
      text: Data.getText(),
    });
  }

  render() {
    const { text } = this.state;
    return (
      <div
        style={{
          backgroundColor: 'white',
          boxShadow: 'rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
          width: 816,
          height: 1123,
          margin: '10px auto',
          // BUG: padding cause page size to increase
          padding: '1rem',
          textAlign: 'justify',
        }}
      >
        {text.map((word, i) => {
          if (word === 'break') {
            return <br key={i} />;
          }
          return (
            <React.Fragment key={i}>
              <span>{word.word}</span>
              <span>&nbsp;</span>
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}
