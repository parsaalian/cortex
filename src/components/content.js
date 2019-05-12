import React, { Component } from 'react';
import componentRegistration from '../utils/componentRegistration';

export default class Content extends Component {
  render() {
    const View = componentRegistration.getView(this.props.content);
    if (componentRegistration.getType(this.props.content) === 'Content') {
      return <View>{this.props.content.content()}</View>
    }
    else {
      console.log(View);
      return <View>{this.props.content.children().map((child, i) => <Content key={i} content={child} />)}</View>
    }
  }
}
