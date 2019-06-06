import React, { Component } from 'react';
import ComponentRegistration from 'global/models/componentRegistration/componentRegistration';
import Content from './content';
import Cursor from './cursor';
import Container from './container';

export default class Node extends Component {
  render() {
    switch (this.props.node.classname) {
      case "Content":
        return <Content node={this.props.node}/>;
      case "Container":
        return <Container node={this.props.node} cursor={this.props.cursor} />;
      case "Cursor":
        return <Cursor/>;
      default:
        return <span>ERROR</span>;
    }
  }
}
