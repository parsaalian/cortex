// @flow
import React from 'react';
import type { Node } from 'react';
import { Provider } from 'react-redux';

import Document from './components/document';
// import StylePicker from './containers/stylePicker';

import startup from './utils/startup';
import store from '~/store';

export default function EditorProvider(): Node {
  // start up
  startup();

  return (
    <Provider store={store}>
      <Document />
      {/* <StylePicker /> */}
    </Provider>
  );
}
