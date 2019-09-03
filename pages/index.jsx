import React from 'react';
import Head from 'next/head';
import Editor from '~/web/views/editor';

const Home = () => (
  <div>
    <Head>
      <title>Editor</title>
    </Head>
    <Editor />
  </div>
);

export default Home;
