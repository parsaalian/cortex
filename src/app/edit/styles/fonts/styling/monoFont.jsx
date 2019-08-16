/* eslint react/prop-types: off */
import React from 'react';
import withStyles from 'react-jss';

import Style from '../../style';

function MonoFont({ children, classes }) {
  return (
    <Style display="inline" styles={classes.monoFont}>
      {children}
    </Style>
  );
}

export default withStyles({
  monoFont: {
    fontFamily: '"Source Code Pro", Courier, mono',
  },
})(MonoFont);
