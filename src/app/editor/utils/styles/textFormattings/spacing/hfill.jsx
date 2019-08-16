/* eslint react/prop-types: off */
import React from 'react';
import withStyles from 'react-jss';

import Style from '../../style';

function HFill({ children, classes }) {
  return (
    <>
      <Style display="inline" styles={classes.hfill}>
        {children}
      </Style>
      <br />
      <br />
    </>
  );
}

export default withStyles({
  hfill: {
    float: 'right',
  },
})(HFill);
