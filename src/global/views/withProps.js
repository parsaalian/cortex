import _ from 'lodash';
import PropTypes from 'prop-types';

const basePropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const baseDefaultProps = {
  children: null,
};

export default function withProps(
  component,
  propTypes = {},
  defaultProps = {},
) {
  /* eslint no-param-reassign: off */
  component.propTypes = _.merge(basePropTypes, propTypes);
  component.defaultProps = _.merge(baseDefaultProps, defaultProps);
  return component;
}
