/* eslint react/prop-types: off */
import React from 'react';
import withStyles from 'react-jss';

import Style from '../../style';

function OneHalfSpacing({ children, classes }) {
  return (
    <Style display="block" styles={classes.oneHalfSpacing}>
      {children}
    </Style>
  );
}

export default withStyles({
  oneHalfSpacing: {
    lineHeight: '1.3',
  },
})(OneHalfSpacing);
