/* eslint react/prop-types: off */
import React from 'react';
import injectSheet from 'react-jss';

import Style from '../../style';

function SingleSpacing({ children, classes }) {
  return (
    <Style display="block" className={classes.singleSpace}>
      {children}
    </Style>
  );
}

export default injectSheet({
  singleSpace: {
    lineHeight: '2',
  },
})(SingleSpacing);
