/* eslint react/prop-types: off */
/* eslint react/no-array-index-key: off */
import React, { Component } from 'react';
import withStyles from 'react-jss';

import Node from '../compontents/node';

class Page extends Component {
  getSizeByType() {}

  render() {
    const { doc, classes, cursor } = this.props;
    return (
      <div className={classes.page}>
        {doc.visualChildren(cursor).map((child, i) => (
          <Node node={child} key={i} cursor={cursor} />
        ))}
      </div>
    );
  }
}

export default withStyles({
  page: {
    border: '1px solid black',
    width: 400,
    height: 640,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 100,
    padding: '1rem',
    textAlign: 'justify',
  },
})(Page);
