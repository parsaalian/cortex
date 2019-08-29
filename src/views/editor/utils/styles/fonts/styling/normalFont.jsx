/* eslint react/prop-types: off */
import React from 'react';
import withStyles from 'react-jss';

import Style from '../../style';

function NormalFont({ children, classes }) {
  return (
    <Style display="inline" styles={classes.normalFont}>
      {children}
    </Style>
  );
}

export default withStyles({
  normalFont: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontVariant: 'normal',
  },
})(NormalFont);
