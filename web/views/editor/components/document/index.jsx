/* eslint {react/prop-types: off} */
import _ from 'lodash';
import React from 'react';

// import Middleware from '~/packages/cadmus';

import Page from './page';

import withTyping from '~/web/views/editor/hoc/withTyping';

function handleType(e) {
  e.preventDefault();
  // Middleware.input(e);
  /* this.setState({
    text: Data.get(),
  }); */
}

function Document({ text }) {
  return (
    <>
      {_.map(text, (page, i) => (
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

export default withTyping(Document, handleType);
