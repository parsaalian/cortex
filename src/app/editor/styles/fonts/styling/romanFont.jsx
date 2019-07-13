/* eslint react/prop-types: off */
import React from 'react';
import withStyles from 'react-jss';

import Style from '../../style';

function RomanFont({ children, classes }) {
  return (
    <Style display="inline" styles={classes.romanFont}>
      {children}
    </Style>
  );
}

export default withStyles({
  romanFont: {
    fontFamily: 'Merriweather, Georgia, "Times New Roman", serif',
  },
})(RomanFont);
