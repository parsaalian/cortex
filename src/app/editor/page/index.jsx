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
    backgroundColor: 'white',
    boxShadow: 'rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
    width: props => props.size.width,
    height: props => props.size.height,
    margin: '10px auto',
    // BUG: padding cause page size to increase
    padding: '1rem',
    textAlign: 'justify',
  },
})(Page);
