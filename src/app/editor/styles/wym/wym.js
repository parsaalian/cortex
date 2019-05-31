import React, { Component } from 'react';
import meta from '../_meta/styles.json';

export default class WYM extends Component {
  render() {
    const description = meta[this.props.wym] ? meta[this.props.wym] : { 'short': '', 'long': '' };
    return <span className='wym'>{this.props.expand ? description.long : description.short}</span>;
  }
}
