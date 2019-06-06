import React, { Component,Fragment } from 'react';

export default class Content extends Component {
  render() {
    return <Fragment>{this.props.node.children}</Fragment>;
  }
}
