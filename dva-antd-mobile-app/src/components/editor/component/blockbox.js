import React from 'react';
import {Icon} from 'antd-mobile';
import {getLocalIcon} from 'utils'
import StyleButton from './stylebutton'
import styles from '../index.less'

const BLOCK_TYPES = [
  // { label: <Icon type={getLocalIcon('/editor/大.svg')}/>, style: 'header-one' },
  // { label:  <Icon type={getLocalIcon('/editor/中.svg')}/>, style: 'header-three' },
  // { label:  <Icon type={getLocalIcon('/editor/小.svg')}/>, style: 'header-six' },
  // { label: 'Blockquote', style: 'blockquote' },
  // { label: 'left', style: 'left' },
  // { label: 'right', style: 'right' },
  // { label: <Icon type={getLocalIcon('/editor/左对齐.svg')}/>, style: 'left' },
  { label:  <Icon type={getLocalIcon('/editor/blockquote.svg')} size="xxs"/>, style: 'blockquote' },
  { label: <Icon type={getLocalIcon('/editor/alignleft.svg')} size="xxs"/>, style: 'left' },
  { label: <Icon type={getLocalIcon('/editor/middle.svg')} size="xxs"/>, style: 'center' },
  { label: <Icon type={getLocalIcon('/editor/ul.svg')} size="xxs"/>, style: 'unordered-list-item' },
];

const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className={styles["RichEditor-controls"]}>
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.style}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};
export default BlockStyleControls
