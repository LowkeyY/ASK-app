import React from 'react';
import styles from '../index.less'

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = styles['RichEditor-styleButton'];
    if (this.props.active) {
      className += ' ' + styles['RichEditor-activeButton'];
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
    );
  }
}
export default StyleButton
