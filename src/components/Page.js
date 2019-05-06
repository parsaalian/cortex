import React, { Component } from 'react';
import './Page.css';

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false, text: [] };
    this.handleClick = this.handleClick.bind(this);
    this.handleType = this.handleType.bind(this);
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
    document.addEventListener('keydown', this.handleType);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
    document.removeEventListener('keydown', this.handleType);
  }

  handleClick(e) {
    if (this.node.contains(e.target)) {
      this.setState({
        active: true
      });
    }
    else {
      this.setState({
        active: false
      });
    }
  }

  handleType(e) {
    if (this.state.active) {
      this.setState({
        text: this.state.text.concat(e.key)
      });
    }
  }

  render() {
    return (
      <div id='type-target' className='page' ref={node => this.node = node}>
        {this.state.text.map(x => x)}<span className='cursor'></span>
      </div>
    );
  }
}
