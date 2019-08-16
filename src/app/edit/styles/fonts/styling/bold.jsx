/* eslint react/prop-types: off */
import React from 'react';
import withStyles from 'react-jss';

import Style from '../../style';

function Bold({ children, classes }) {
  return (
    <Style display="inline" styles={classes.bold}>
      {children}
    </Style>
  );
}

export default withStyles({
  bold: {
    fontWeight: 'bold',
  },
})(Bold);
