import React, { Component } from 'react';

export default class Word extends Component {
  render() {
    return (
      <span>{this.props.word}</span>
    );
  }
}
