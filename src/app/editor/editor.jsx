/* eslint react/prop-types: off */
import React, { Component } from 'react';
import injectSheet from 'react-jss';

import ComponentRegistration from 'global/models/componentRegistration/componentRegistration';

import Node from './compontents/node';
import styles from './styles';
import { doc, cursor } from './sample';

class Editor extends Component {
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
    const { classes } = this.props;
    return (
      <div id="type-target" className={classes.page}>
        {doc.visualChildren(cursor).map((child) => (
          <Node node={child} key={child.id} cursor={cursor} />
        ))}
      </div>
    );
  }
}

export default injectSheet({
  page: {
    border: '1px solid black',
    width: 400,
    height: 640,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 100,
    padding: '1rem',
    textAlign: 'justify',
    overflowWrap: 'break-word',
  },
})(Editor);
