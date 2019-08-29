/* eslint {react/prop-types: off, react/no-array-index-key: off} */
import React from 'react';
import withStyles from 'react-jss';

import Line from '../line';

function Page({ page, classes }) {
  return (
    <div className={classes.page}>
      {page.map((line, i) => (
        <Line key={i} line={line} />
      ))}
    </div>
  );
}

export default withStyles({
  page: {
    backgroundColor: 'white',
    boxShadow: 'rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
    width: (props) => props.size.width,
    height: (props) => props.size.height,
    margin: '10px auto',
    // BUG: padding cause page size to increase
    padding: '1rem',
    textAlign: 'justify',
  },
})(Page);
