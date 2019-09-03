/* eslint {react/prop-types: off, react/no-array-index-key: off} */
import React, { Component } from 'react';

// import Data from 'utils/data';
// import Middleware from '~/packages/cadmus';

import sizing from '~/packages/damastes';

import Page from './page';

export default class Document extends Component {
  constructor(props) {
    super(props);
    this.state = { text: [[[['']]]] /* Data.get() */ };
    this.handleType = this.handleType.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleType);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleType);
  }

  handleType(e) {
    e.preventDefault();
    console.log(sizing(e.key));
    // Middleware.input(e);
    /* this.setState({
      text: Data.get(),
    }); */
  }

  render() {
    const { text } = this.state;
    return (
      <React.Fragment>
        {text.map((page, i) => (
          <Page
            key={i}
            page={page}
            size={{
              width: '559px',
              height: '794px',
            }}
          />
        ))}
      </React.Fragment>
    );
  }
}
