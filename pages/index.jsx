// @flow
import React, { type Node } from 'react';
import Head from 'next/head';
import Editor from '~/web/views/editor';

function Home(): Node {
  return (
    <div>
      <Head>
        <title>Editor</title>
      </Head>
      <Editor />
    </div>
  );
}

export default Home;
