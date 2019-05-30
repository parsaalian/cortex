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
  }
};

export default _.merge(styles, fonts);
