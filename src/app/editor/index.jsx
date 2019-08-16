// @flow
import React from 'react';
import type { Node } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import Editor from './components/editor';

export default function EditorProvider(): Node {
  return (
    <Provider store={store}>
      <Editor />
    </Provider>
  );
}
