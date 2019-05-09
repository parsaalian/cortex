import React, { Component } from 'react';
import './Paragraph.css';

import Word from './Word';

export default class Paragraph extends Component {
  render() {
    return (
      <div className='paragraph'>
        {this.props.paragraph.map((word, i) => <Word key={i} word={word.getString()} />)}
      </div>
    );
  }
}
