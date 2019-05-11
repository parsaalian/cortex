import React, { Component } from 'react';
import './styles.css';

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

export class Paragraph extends Component {
  render() {
    return <Style type='outline' styleName={this.props.paragraph}>{this.props.children}</Style>;
  }
}

export class Size extends Component {
  render() {
    return <Style type='inline' styleName={'size' + this.props.size}>{this.props.children}</Style>;
  }
}

export class Bold extends Component {
  render() {
    return <Style type='inline' styleName='bold'>{this.props.children}</Style>;
  }
}

export class Text extends Component {
  render() {
    return <Style type='inline'>{this.props.children}</Style>;
  }
}
