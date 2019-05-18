import _ from 'lodash';
import React, { Component } from 'react';
import './fonts.scss';
import Style from '../style';

const sizes = ['Tiny', 'Script', 'Footnote', 'Small', 'Normal', 'Large1', 'Large2', 'Large3', 'Huge1', 'Huge2'];

const sizesElements = _.reduce(sizes, (result, value) => {
  class Element extends Component {
    render() {
      return <Style type='inline' styleName={'size-std11' + value.toLowerCase()}>{this.props.children}</Style>;
    }
  }
  Element.displayName = value + 'Size';
  result['size-' + value.toLowerCase()] = Element;
  return result;
}, {});

export default sizesElements;
