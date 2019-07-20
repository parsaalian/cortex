/* eslint react/prop-types: off */
import React, { Component } from 'react';

import ComponentRegistration from 'models/utils/componentRegistration';
import StateStorage from 'global/models/models/stores/document';

import Page from './page';
import styles from './styles';
import { doc, cursor } from './sample';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.startup();
    this.handleType = this.handleType.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleType);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleType);
  }

  startup() {
    ComponentRegistration.register(styles);
  }

  handleType(e) {
    if (e.key === 'ArrowLeft') {
      cursor.left();
    } else if (e.key === 'ArrowRight') {
      cursor.right();
    } else if (e.key === 'Backspace') {
      cursor.backspace();
    } else {
      cursor.type('fuck?');
    }
  }

  render() {
    const size = StateStorage.get(['pageSizes', StateStorage.get(['pageSize', 'type'])]);
    return <Page doc={doc} cursor={cursor} size={size} />;
  }
}
