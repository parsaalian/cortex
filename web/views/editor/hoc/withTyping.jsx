/* eslint react/jsx-props-no-spreading: off */
import React, { Component } from 'react';

const withTyping = (WrappedComponent) =>
  class extends Component {
    componentDidMount() {
      const { handleType } = this.props;
      document.addEventListener('keydown', handleType);
    }

    componentWillUnmount() {
      const { handleType } = this.props;
      document.removeEventListener('keydown', handleType);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export default withTyping;
