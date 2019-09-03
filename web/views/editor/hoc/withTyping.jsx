/* eslint react/jsx-props-no-spreading: off */
import React, { Component } from 'react';

const withTyping = (WrappedComponent, handleType) =>
  class extends Component {
    componentDidMount() {
      document.addEventListener('keydown', handleType);
    }

    componentWillUnmount() {
      document.removeEventListener('keydown', handleType);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export default withTyping;
