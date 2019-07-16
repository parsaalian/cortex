/* eslint {react/prop-types: off, react/no-array-index-key: off} */
import _ from 'lodash';
import React, { Component } from 'react';

import typeHandler from 'models/middlewares/typeHandler';

function Line({ textArray, id, setRef, show }) {
  return (
    <div
      id={id}
      style={{
        backgroundColor: 'white',
        maxWidth: '100%',
        maxHeight: 18,
        overflowX: 'scroll',
        whiteSpace: 'nowrap',
        textAlign: 'justify',
        display: show,
      }}
      ref={(r) => setRef(`line${id}`, r)}
    >
      {textArray.join(' ')}
    </div>
  );
}

export default class Liney extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: [
        _.repeat(
          'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.',
          6,
        ),
      ],
      lines: [],
      show: 'block',
    };
    this.setRef = this.setRef.bind(this);
    this.decomposeLine = this.decomposeLine.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleType);

    const { text } = this.state;
    console.log(text[0].split(' ').length);

    this.setState({
      lines: [text],
    });
    setTimeout(() => this.decomposeLine(0));
  }

  setRef(key, ref) {
    this[key] = ref;
  }

  handleType(e) {
    typeHandler.logKey(e);
  }

  decomposeLine(line) {
    const date = new Date();
    const element = this[`line${line}`];
    const text = element.firstChild.nodeValue.split(' ');

    element.removeChild(element.firstChild);

    for (let i = 0; i < text.length; i += 1) {
      const word = document.createTextNode(i !== text.length - 1 ? `${text[i]} ` : text[i]);
      element.appendChild(word);
      if (element.scrollWidth > element.clientWidth) {
        const { lines } = this.state;
        const newLines = [...lines];
        newLines[line] = text.slice(0, i);
        newLines.push(text.slice(i));
        this.setState({
          lines: newLines,
        });
        this.decomposeLine(line + 1);
        break;
      }
    }

    if (line === 0) {
      console.log(new Date() - date);
      this.setState({
        show: 'block',
      });
    }
  }

  render() {
    const { lines, show } = this.state;
    return (
      <div
        style={{
          backgroundColor: 'white',
          boxShadow: 'rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
          width: 816,
          height: 1123,
          margin: '10px auto',
          // BUG: padding cause page size to increase
          padding: '1rem',
          textAlign: 'justify',
        }}
      >
        {lines.map((line, i) => (
          <Line textArray={line} key={i} id={i} setRef={this.setRef} show={show} />
        ))}
      </div>
    );
  }
}
