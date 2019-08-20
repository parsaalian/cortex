import React from 'react';
import { connect } from 'react-redux';
import changeStyle from '../../actions/styling';
import StyledDropItem from './styledComponents/dropItem';

function DropItem({ name, value, onClick }) {
  const style = {
    format: {
      text: {
        [name]: value,
      },
    },
  };

  return (
    <StyledDropItem
      onClick={(e) => {
        e.preventDefault();
        onClick(style);
      }}
    >
      {name}
    </StyledDropItem>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onClick: (style) => dispatch(changeStyle(style)),
});

export default connect(
  null,
  mapDispatchToProps,
)(DropItem);
