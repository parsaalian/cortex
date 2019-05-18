import React, { Component } from 'react';
import './editor.scss';
import Content from './content/content';
import styles from './styles/styles';
import doc from './sample';
import ComponentRegistration from 'global/models/componentRegistration/componentRegistration';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    ComponentRegistration.register(styles);
  }

  render() {
    return (
      <div id='type-target' className='page' ref={node => this.node = node}>
        {doc.children().map((child, i) => <Content key={i} content={child}/>)}
      </div>
    );
  }
}
