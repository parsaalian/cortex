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

const styles = {
  'content':
  class Text extends Component {
    render() {
      return <Style type='inline'>{this.props.children}</Style>;
    }
  },
  'paragraph':
  class Paragraph extends Component {
    render() {
      console.log('in paragraph');
      return <Style type='outline'>{this.props.children}</Style>;
    }
  },
  'size':
  class Size extends Component {
    render() {
      return <Style type='inline' styleName={'size-' + this.props.attributes.size}>{this.props.children}</Style>;
    }
  },
  'bold':
  class Bold extends Component {
    render() {
      return <Style type='inline' styleName='bold'>{this.props.children}</Style>;
    }
  },
  'italic':
  class Italic extends Component {
    render() {
      return <Style type='inline' styleName='italic'>{this.props.children}</Style>;
    }
  }
};

export default styles;
