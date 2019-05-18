import _ from 'lodash';
import React, { Component } from 'react';
import './styles.scss';
import Style from './style';
import fonts from './fonts/fonts';

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

export default _.merge(styles, fonts);
