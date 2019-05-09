import React, { Component } from 'react';
import './Page.css';
import './Tags.css';

// Components
import Paragraph from './Paragraph';

// Utils
import Document from '../utils/document';

const doc = new Document();

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false, document: doc.getDocument() };
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
      if (e.key === 'Enter') {
        const newDocument = doc.appendParagraph();
        this.setState({
          document: newDocument
        });
      }
      else if (e.key === 'Backspace') {
        const newDocument = doc.clearParagraph();
        this.setState({
          document: newDocument
        });
      }
      else {
        const newDocument = doc.writeWord(e.key);
        this.setState({
          document: newDocument
        });
      }
    }
  }

  render() {
    return (
      <div id='type-target' className='page' ref={node => this.node = node}>
        {this.state.document.map((paragraph, i) => <Paragraph key={i} paragraph={paragraph.getWords()} />)}<span className='cursor'></span>
      </div>
    );
  }
}
