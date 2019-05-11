import React, { Component } from 'react';

// components
import { Paragraph,
          Size,
          Text} from './styles';

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
        console.log(this.props.content);
        return <Size size={this.props.content.size}>{this.props.content.children().map((child, i) => <Content key={i} content={child} />)}</Size>

      default:
        return <div></div>
    }
  }
}
