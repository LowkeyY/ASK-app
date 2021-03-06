import React from 'react';
import {Icon} from 'antd-mobile';
import {getLocalIcon} from 'utils'
import StyleButton from './stylebutton'
import styles from '../index.less'

const INLINE_STYLES = [
  { label: <Icon type={getLocalIcon('/editor/bold.svg')} size="sm"/>, style: 'BOLD' },
  { label: <Icon type={getLocalIcon('/editor/italic.svg')} size="sm"/>, style: 'ITALIC' },
];
const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className={styles["RichEditor-controls-inline"]}>
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.style}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />

      )}
    </div>
  );
};

export default InlineStyleControls
