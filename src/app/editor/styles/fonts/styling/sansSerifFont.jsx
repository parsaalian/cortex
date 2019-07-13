/* eslint react/prop-types: off */
import React from 'react';
import withStyles from 'react-jss';

import Style from '../../style';

function SansSerifFont({ children, classes }) {
  return (
    <Style display="inline" styles={classes.sansSerifFont}>
      {children}
    </Style>
  );
}

export default withStyles({
  sansSerifFont: {
    fontFamily: '"Source Sans Pro", Helvetica, Verdana, sans-serif',
  },
})(SansSerifFont);
