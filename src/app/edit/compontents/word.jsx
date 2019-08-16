/* eslint {react/prop-types: off, react/no-array-index-key: off} */
import React from 'react';
import withStyles from 'react-jss';

import './cursor.scss';

function Line({ word, classes }) {
  return (
    <>
      {word.map((char, i) => {
        if (char === 'cursor') {
          return <span key={i} className={classes.cursor} />;
        }
        return <React.Fragment key={i}>{char}</React.Fragment>;
      })}
    </>
  );
}

export default withStyles({
  cursor: {
    border: '1px solid black',
    '-webkit-animation': 'flickerAnimation 1s infinite',
    '-moz-animation': 'flickerAnimation 1s infinite',
    '-o-animation': 'flickerAnimation 1s infinite',
    animation: 'flickerAnimation 1s infinite',
  },
})(Line);
