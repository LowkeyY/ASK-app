import React from 'react';
import {Icon} from 'antd-mobile';
import {getLocalIcon} from 'utils'
import StyleButton from './stylebutton'
import styles from '../index.less'

const INLINE_STYLES = [
  { label:  <Icon type={getLocalIcon('/editor/加粗.svg')}/>, style: 'BOLD' },
  { label:  <Icon type={getLocalIcon('/editor/斜体.svg')}/>, style: 'ITALIC' },
  // { label:  <Icon type={getLocalIcon('/editor/下划线.svg')}/>, style: 'UNDERLINE' },
];
const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className={styles["RichEditor-controls"]}>
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
