/* eslint {react/prop-types: off, react/no-array-index-key: off} */
import React from 'react';
import withStyles from 'react-jss';

import Word from './word';
import './cursor.scss';

function Line({ line, classes }) {
  return (
    <div className={classes.line}>
      {line.map((word, i) => (
        <React.Fragment key={i}>
          <Word word={word} />
          &nbsp;
        </React.Fragment>
      ))}
    </div>
  );
}

export default withStyles({
  line: {
    width: '100%',
  },
})(Line);
