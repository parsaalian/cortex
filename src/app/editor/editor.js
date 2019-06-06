import React, { Component } from 'react';
import './editor.scss';
import Node from './compontents/node';
import styles from './styles/styles';
import {doc, cursor} from './sample';
import ComponentRegistration from 'global/models/componentRegistration/componentRegistration';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.startup();
    this.handleType = this.handleType.bind(this);
  }

  startup() {
    ComponentRegistration.register(styles);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleType);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleType);
  }

  handleType(e) {
    if (e.key === 'ArrowLeft') {
      console.log('left');
      cursor.left();
    }
    else if (e.key === 'ArrowRight') {
      console.log('right');
      cursor.right();
    }
    else if (e.key === 'Backspace') {
      cursor.backspace();
    }
    else {
      cursor.type('fuck?');
    }
    console.log(cursor.location());
  }

  render() {
    return (
      <div id='type-target' className='page'>
        {doc.visualChildren(cursor).map((child, i) => <Node node={child} key={i} cursor={cursor} />)}
      </div>
    );
  }
}
