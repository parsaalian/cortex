import React, { Component } from 'react';
import './styles.css';

// utils
import ComponentRegistration from '../utils/componentRegistration';

// data
import Content from '../data/content';
import Container from '../data/container';

class Style extends Component {
  render() {
    switch (this.props.type) {
      case 'inline':
        return <span className={this.props.styleName}>{this.props.children}</span>
      default:
        return <div className={this.props.styleName}>{this.props.children}</div>
    }
  }
}

export class ParagraphContainer extends Container {};
export class SizeContainer extends Container {
  constructor(size, nodes) {
    super(nodes);
    this.size = size;
  }
};
export class BoldContainer extends Container {};
export class ItalicContainer extends Container {};
export class TextJustifyContainer extends Container {};
export class TextCenterContainer extends Container {};
export class TextLeftContainer extends Container {};
export class TextRightContainer extends Container {};

ComponentRegistration.register([
  [
    Content,
    class Text extends Component {
      render() {
        return <Style type='inline'>{this.props.children}</Style>;
      }
    }
  ],
  [
    ParagraphContainer,
    class Paragraph extends Component {
      render() {
        return <Style type='outline'>{this.props.children}</Style>;
      }
    }
  ],
  [
    SizeContainer,
    class Size extends Component {
      render() {
        return <Style type='inline' styleName={'size' + this.props.size}>{this.props.children}</Style>;
      }
    }
  ],
  [
    BoldContainer,
    class Bold extends Component {
      render() {
        return <Style type='inline' styleName='bold'>{this.props.children}</Style>;
      }
    }
  ],
  [
    ItalicContainer,
    class Italic extends Component {
      render() {
        return <Style type='inline' styleName='italic'>{this.props.children}</Style>;
      }
    }
  ],
  [
    TextJustifyContainer,
    class TextJustify extends Component {
      render() {
        return <Style type='inline' styleName='text-justify'>{this.props.children}</Style>;
      }
    }
  ],
  [
    TextCenterContainer,
    class TextCenter extends Component {
      render() {
        return <Style type='inline' styleName='text-center'>{this.props.children}</Style>;
      }
    }
  ],
  [
    TextLeftContainer,
    class TextLeft extends Component {
      render() {
        return <Style type='inline' styleName='text-left'>{this.props.children}</Style>;
      }
    }
  ],
  [
    TextRightContainer,
    class TextRight extends Component {
      render() {
        return <Style type='inline' styleName='text-right'>{this.props.children}</Style>;
      }
    }
  ]
]);
