// @flow
import React from 'react';
import type { Node } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import Document from './components/editor';

import startup from './utils/startup';

export default function EditorProvider(): Node {
  // start up
  startup();

  return (
    <Provider store={store}>
      <Document />
    </Provider>
  );
}
