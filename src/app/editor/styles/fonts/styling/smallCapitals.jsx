/* eslint react/prop-types: off */
import React from 'react';
import withStyles from 'react-jss';

import Style from '../../style';

function SmallCapitals({ children, classes }) {
  return (
    <Style display="inline" styles={classes.smallCapitals}>
      {children}
    </Style>
  );
}

export default withStyles({
  smallCapitals: {
    fontVariant: 'small-caps',
  },
})(SmallCapitals);
