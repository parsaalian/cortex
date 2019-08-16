/* eslint react/prop-types: off */
import React from 'react';
import withStyles from 'react-jss';

import Style from '../../style';

function Light({ children, classes }) {
  return (
    <Style display="inline" styles={classes.light} name="light">
      {children}
    </Style>
  );
}

export default withStyles({
  light: {
    fontWeight: 'lighter',
  },
})(Light);
