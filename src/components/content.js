import React, { Component } from 'react';

// components
import { Text,
          Paragraph,
          Size,
          Bold,
          Italic } from './styles';

// utils
import TypeCheck from '../utils/typeCheck';
const typeChecker = new TypeCheck();

export default class Content extends Component {
  render() {
    switch (typeChecker.getType(this.props.content)) {
      case 'content':
        return <Text>{this.props.content.content()}</Text>

      case 'paragraph':
        return <Paragraph paragraph='justify'>{this.props.content.children().map((child, i) => <Content key={i} content={child} />)}</Paragraph>;

      case 'size':
        return <Size size={this.props.content.size}>{this.props.content.children().map((child, i) => <Content key={i} content={child} />)}</Size>

      case 'bold':
        return <Bold>{this.props.content.children().map((child, i) => <Content key={i} content={child} />)}</Bold>

      case 'italic':
        return <Italic>{this.props.content.children().map((child, i) => <Content key={i} content={child} />)}</Italic>

      default:
        return <div></div>
    }
  }
}
