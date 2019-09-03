/* eslint {react/prop-types: off, react/no-array-index-key: off} */
import React, { Component } from 'react';

// import Middleware from '~/packages/cadmus';

import Page from './page';
import sizing from '~/packages/damastes';

import withTyping from '~/web/views/editor/hoc/withTyping';

function handleType(e) {
  e.preventDefault();
  console.log(sizing(e.key));
  // Middleware.input(e);
  /* this.setState({
    text: Data.get(),
  }); */
}

class Document extends Component {
  constructor(props) {
    super(props);
    this.state = { text: [[[['']]]] /* Data.get() */ };
  }

  render() {
    const { text } = this.state;
    return (
      <>
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
      </>
    );
  }
}

export default withTyping(Document, handleType);
