// @flow
import React, { type Node } from 'react';

import Editor from './editor';

export default function App(): Node {
  return (
    <div className="app">
      <Editor />
    </div>
  );
}
