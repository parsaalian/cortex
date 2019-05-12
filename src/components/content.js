import React, { Component } from 'react';
import ComponentRegistration from '../utils/componentRegistration';

export default class Content extends Component {
  render() {
    const View = ComponentRegistration.getView(this.props.content.type());
    if (this.props.content.type() === 'content') {
      return <View>{this.props.content.content()}</View>
    }
    else {
      return <View attributes={this.props.content.attributes()}>{this.props.content.children().map((child, i) => <Content key={i} content={child} />)}</View>
    }
  }
}
