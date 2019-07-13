/* eslint react/prop-types: off */
import React from 'react';
import withStyles from 'react-jss';

import Style from '../../style';

function SingleSpacing({ children, classes }) {
  return (
    <Style display="block" styles={classes.singleSpacing}>
      {children}
    </Style>
  );
}

export default withStyles({
  singleSpacing: {
    lineHeight: 'normal',
  },
})(SingleSpacing);
