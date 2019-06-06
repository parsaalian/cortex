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
  }

  startup() {
    ComponentRegistration.register(styles);
  }

  render() {
    return (
      <div id='type-target' className='page' ref={node => this.node = node}>
        {doc.visualChildren(cursor).map((child, i) => <Node node={child} key={i} cursor={cursor} />)}
      </div>
    );
  }
}
