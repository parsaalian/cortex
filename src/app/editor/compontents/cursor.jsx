/* eslint react/prop-types: off */
import React from 'react';
import withStyles from 'react-jss';

import './cursorAnimation.scss';

function Cursor({ classes }) {
  return <span className={classes.cursor} />;
}

export default withStyles({
  cursor: {
    border: '1px solid black',
    marginLeft: 2,
    '-webkit-animation': 'flickerAnimation 1s infinite',
    '-moz-animation': 'flickerAnimation 1s infinite',
    '-o-animation': 'flickerAnimation 1s infinite',
    animation: 'flickerAnimation 1s infinite',
  },
})(Cursor);
