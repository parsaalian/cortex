/* eslint react/prop-types: off */
import React from 'react';
import withStyles from 'react-jss';

import Style from '../../style';

function Uppercase({ children, classes }) {
  return (
    <Style display="inline" styles={classes}>
      {children}
    </Style>
  );
}

export default withStyles({
  uppercase: {
    textTransform: 'uppercase',
  },
})(Uppercase);
