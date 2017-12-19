import React from 'react';
import {Button,Icon} from 'antd-mobile';
import { Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap, AtomicBlockUtils, convertToRaw, Entity, ContentState} from 'draft-js';
import {getLocalIcon} from 'utils'
import Immutable from 'immutable';
import MediaControls from './component/mediabox'
import InlineStyleControls from './component/inlinebox'
import BlockStyleControls from './component/blockbox'
import "draft-js/dist/Draft.css";
import styles from './index.less'
const blockRenderMap = Immutable.Map({
  'left': {
    element: 'div',
  },
  'right': {
    element: 'div',
  },
  'center': {
    element: 'div',
  },

});
class CreateEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      disabled:true,
      url: '',
      urlType: '',
    };

    this.focus = () => this.refs.editor.focus();
    this.logState = () => {//发送数据
      const content = this.state.editorState.getCurrentContent();
      alert();
      console.log(convertToRaw(content));
    };
    this.onURLChange = (e) => this.setState({ urlValue: e.target.value });
    this.addImage = this._addImage.bind(this);
    this.confirmMedia = this._confirmMedia.bind(this);
    this.pasteMedia = this._pasteImage.bind(this);
    this.onChange = (editorState) => this.setState({ editorState });
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.onURLInputKeyDown = this._onURLInputKeyDown.bind(this);
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
  }

  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  _confirmMedia(e) {
    e.preventDefault();
    const {editorState, urlValue, urlType} = this.state;
    const entityKey = Entity.create(urlType, 'IMMUTABLE', { src: urlValue })

    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' '
      ),
      showURLInput: false,
      urlValue: '',
    }, () => {
      setTimeout(() => this.focus(), 0);
    });
  }

  _pasteImage(files) {
    console.log('files',files);
    const {editorState} = this.state;
    let _self = this;
    for (var i = 0; i < files.length; i++) {
      if (files[i].type.indexOf("image") !== -1) {
        // We need to represent the image as a file,
        var blob = files[i];
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          let base64data = reader.result;
          const entityKey = Entity.create('image', 'IMMUTABLE', { src: base64data })

          _self.setState({
            editorState: AtomicBlockUtils.insertAtomicBlock(
              editorState,
              entityKey,
              ' '
            ),
            showURLInput: false,
            urlValue: '',
          }, () => {
            setTimeout(() => _self.focus(), 0);
          });
        }
      }
    }
  }

  _onURLInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmMedia(e);
    }
  }

  _promptForMedia(type) {
    const {editorState} = this.state;
    this.setState({
      showURLInput: true,
      urlValue: '',
      urlType: type,
    }, () => {
      setTimeout(() => this.refs.url.focus(), 0);
    });
  }

  _addImage() {
    this._promptForMedia('image');
  }

  render() {
    const {editorState} = this.state;
    const  display=this.props.editorControl?{display:'block'}:{display:'none'};
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = styles['RichEditor-editor'];
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' ' + styles['RichEditor-hidePlaceholder'];
      }
    }

    return (
      <div className={styles["RichEditor-box"]}>
        <div className={styles["RichEditor-root"]}>
          <div className={className} onClick={this.focus} >
            <Editor
              blockStyleFn={getBlockStyle}
              blockRendererFn={mediaBlockRenderer}
              blockRenderMap={DefaultDraftBlockRenderMap.merge(blockRenderMap)}

              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              handlePastedText={(value) => (console.log('paste', value))}
              handlePastedFiles={this.pasteMedia}
              handleDroppedFiles={this.pasteMedia}
              onChange={this.onChange}
              onTab={this.onTab}
              placeholder={this.props.placeholder}
              ref='editor'
              spellCheck={true}
              onPaste={(value) => (console.log('paste', value))}
            />
          </div>
          <div className={styles["RichEditor-control"]}>
            <div className={styles["RichEditor-control-box"]}>
              <MediaControls/>
              <InlineStyleControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
              />
              <BlockStyleControls
                editorState={editorState}
                onToggle={this.toggleBlockType}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  static defaultProps={
    isShowEditor:false
  };
}


function getBlockStyle(block) {
  switch (block.getType()) {
    case 'left':
      return styles['align-left'];
    case 'center':
      return styles['align-center'];
    case 'blockquote':
      return styles['blockquote'];
    default: return null;
  }
}

function mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }

  return null;
}


const Image = (props) => {
  return <img src={props.src} style={styles2.media} />;
};


const Media = (props) => {
  const entity = Entity.get(props.block.getEntityAt(0));
  const {src} = entity.getData();
  const type = entity.getType();

  let media;
  if (type === 'audio') {
    media = <Audio src={src} />;
  } else if (type === 'image') {
    media = <Image src={src} />;
  } else if (type === 'video') {
    media = <Video src={src} />;
  }

  return media;
};

const styles2 = {
  root: {
    fontFamily: '\'Georgia\', serif',
    padding: 0,
    width: '100%',
  },
  buttons: {
    marginBottom: 10,
  },
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: '\'Georgia\', serif',
    marginRight: 10,
    padding: 3,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 200,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  media: {
    width: '100%',
  },
}


CreateEditor.propTypes = {
}

export default CreateEditor;





// import React from 'react';
// import MonacoEditor from 'react-monaco-editor';
//
// class CreateEditor extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       code: '// type your code...',
//     }
//   }
//   editorDidMount(editor, monaco) {
//     console.log('editorDidMount', editor);
//     editor.focus();
//   }
//   onChange(newValue, e) {
//     console.log('onChange', newValue, e);
//   }
//   render() {
//     const code = this.state.code;
//     const options = {
//       selectOnLineNumbers: true
//     };
//     return (
//       <MonacoEditor
//         width="800"
//         height="600"
//         language="javascript"
//         theme="vs-dark"
//         value={code}
//         options={options}
//         onChange={::this.onChange}
//         editorDidMount={::this.editorDidMount}
//       />
//     );
//   }
// }
// export default CreateEditor


// import React, { Component } from 'react';
// import Editor from 'draft-js-plugins-editor';
// import createHashtagPlugin from 'draft-js-hashtag-plugin';
// import createLinkifyPlugin from 'draft-js-linkify-plugin';
// import createImagePlugin from 'draft-js-image-plugin';
// import { EditorState } from 'draft-js';
// const imagePlugin = createImagePlugin();
// const hashtagPlugin = createHashtagPlugin();
// const linkifyPlugin = createLinkifyPlugin();
//
// const plugins = [
//   hashtagPlugin,
//   linkifyPlugin,
//   imagePlugin
// ];
//
//  class CreateEditor extends Component {
//
//   state = {
//     editorState: EditorState.createEmpty(),
//   };
//
//   onChange = (editorState) => {
//     this.setState({
//       editorState,
//     });
//   };
//
//   render() {
//     return (
//       <Editor
//         editorState={this.state.editorState}
//         onChange={this.onChange}
//         plugins={plugins}
//       />
//     );
//   }
// }
// export default CreateEditor
