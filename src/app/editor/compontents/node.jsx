/* eslint react/prop-types: off */
import React from 'react';
import Content from './content';
import Cursor from './cursor';
import Container from './container';

export default function Node({ node, cursor }) {
  switch (node.classname) {
    case 'Content':
      return <Content node={node} />;
    case 'Container':
      return <Container node={node} cursor={cursor} />;
    case 'Cursor':
      return <Cursor />;
    default:
      return <span>ERROR</span>;
  }
}
