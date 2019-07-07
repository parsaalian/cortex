import React, { Component } from 'react';

export default class Content extends Component {
  render() {
    return <>{this.props.node.children}</>;
  }
}
