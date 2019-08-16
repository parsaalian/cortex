/* eslint {react/prop-types: off, react/no-array-index-key: off} */
import React, { Component } from 'react';

import Data from 'models/data';
import Middleware from 'models/middlewares';
import ComponentRegistration from 'models/utils/componentRegistration';
import StateStorage from 'models/stores/document';

import Page from '../page';
import styles from '../styles';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { text: Data.get() };
    this.handleType = this.handleType.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleType);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleType);
  }

  handleType(e) {
    e.preventDefault();
    Middleware.input(e);
    this.setState({
      text: Data.get(),
    });
  }

  startup() {
    ComponentRegistration.register(styles);
  }

  render() {
    const { text } = this.state;
    const size = StateStorage.get(['pageSizes', StateStorage.get(['pageSize', 'type'])]);
    return (
      <>
        {text.map((page, i) => (
          <Page key={i} page={page} size={size} />
        ))}
      </>
    );
  }
}
