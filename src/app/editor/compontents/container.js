import React, { Component } from 'react';
import ComponentRegistration from 'global/models/componentRegistration/componentRegistration';
import Node from './node';

export default class Container extends Component {
  render() {
    const View = ComponentRegistration.getView(this.props.node.type);
    let res = (<View attributes={this.props.node.attributes}>
      {this.props.node.visualChildren(this.props.cursor).map(child => <Node node={child} cursor={this.props.cursor} />)}
    </View>);
    return res;
  }
}
