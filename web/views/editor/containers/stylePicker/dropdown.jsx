import React, { Component } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.css';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick(e) {
    if (this.node.contains(e.target) && !this.drop.contains(e.target)) {
      const { show } = this.state;
      this.setState({
        show: !show,
      });
    } else if (!this.drop.contains(e.target)) {
      this.setState({
        show: false,
      });
    }
  }

  render() {
    const { children } = this.props;
    const { show } = this.state;
    return (
      <React.Fragment>
        <div
          className={styles.icon}
          ref={(node) => {
            this.node = node;
          }}
        >
          <FontAwesomeIcon icon={faFileAlt} />
        </div>
        <div
          className={show ? classnames(styles.show, styles.dropdown) : styles.dropdown}
          ref={(drop) => {
            this.drop = drop;
          }}
        >
          {children}
        </div>
      </React.Fragment>
    );
  }
}
