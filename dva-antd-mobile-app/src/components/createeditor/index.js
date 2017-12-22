import React from 'react';
import {Button,Icon} from 'antd-mobile';
import { Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap, AtomicBlockUtils, convertToRaw, Entity, ContentState} from 'draft-js';
import {getLocalIcon} from 'utils'
import Immutable from 'immutable';
import {stateToHTML} from 'draft-js-export-html';
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
let options = { // 转换Html
  blockStyleFn(block) {
    if (block.getType() === 'center') {
      return {
        attributes: {
          align: 'center'
        }
      }
    }else if (block.getType() === 'blockquote') {
      return {
        attributes: {
          background: '#ddd',
          margin: '10px 0'
        }
      }
    }
  },
  entityStyleFn: (entity) => {
    const entityType = entity.get('type').toLowerCase();
    console.log(entityType)
    if (entityType === 'atomic') {
      const data = entity.getData();
      return {
        element: 'img',
        attributes: {
          src: data.src,
        },
        style: {
          // Put styles here...
        },
      };
    }
  },
}
class CreateEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      disabled:true,
      isShowController:false,
      url: '',
      urlType: '',
    };

    this.focus = () => this.refs.editor.focus();
    this.logState = () => {//发送数据
      const content = this.state.editorState.getCurrentContent();
      console.log(stateToHTML(this.state.editorState.getCurrentContent(), options));
    };
    this.onURLChange = (e) => this.setState({ urlValue: e.target.value });
    this.confirmMedia = this._confirmMedia.bind(this);
    this.onChange = (editorState) => this.setState({ editorState });
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.insertImage = (file) => this._insertImage(file);
    this.handleFileInput=this._handleFileInput.bind(this)
    this.handleUploadImage = () => this._handleUploadImage();
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

  _insertImage(file) { //插入图片
    const  fileSrc =  typeof file == "object" ? URL.createObjectURL(file) : file;
    const entityKey = Entity.create('atomic', 'IMMUTABLE', {
      src: fileSrc,
    });
    this.onChange(AtomicBlockUtils.insertAtomicBlock(
      this.state.editorState,
      entityKey,
      ' '
    ));
    console.log(fileSrc)
  }
  // uploadImg(file, callback) {
  //   callback("http://tupian.enterdsk.com/2013/lxy/12/9/3/1.jpg")
  // };
  _handleFileInput(e) {
    const fileList = e.target.files;
    const file = fileList[0];
    // if ( (typeof this.uploadImg) != "undefined" && (typeof this.uploadImg) == "function" ){
    //   this.uploadImg(file,this.insertImage)
    //   console.log(this.insertImage)
    //   return
    // }
    this.insertImage(file);
  }
  _handleUploadImage() {
    this.refs.fileInput.click();
  }
  // _pasteImage(files) {
  //   console.log('files',files);
  //   const {editorState} = this.state;
  //   let _self = this;
  //   for (var i = 0; i < files.length; i++) {
  //     if (files[i].type.indexOf("image") !== -1) {
  //       // We need to represent the image as a file,
  //       var blob = files[i];
  //       let reader = new FileReader();
  //       reader.readAsDataURL(blob);
  //       reader.onloadend = function () {
  //         let base64data = reader.result;
  //         const entityKey = Entity.create('image', 'IMMUTABLE', { src: base64data })
  //
  //         _self.setState({
  //           editorState: AtomicBlockUtils.insertAtomicBlock(
  //             editorState,
  //             entityKey,
  //             ' '
  //           ),
  //           showURLInput: false,
  //           urlValue: '',
  //         }, () => {
  //           setTimeout(() => _self.focus(), 0);
  //         });
  //       }
  //     }
  //   }
  // }

  // _onURLInputKeyDown(e) {
  //   if (e.which === 13) {
  //     this._confirmMedia(e);
  //   }
  // }

  // _promptForMedia(type) {
  //   const {editorState} = this.state;
  //   this.setState({
  //     showURLInput: true,
  //     urlValue: '',
  //     urlType: type,
  //   }, () => {
  //     setTimeout(() => this.refs.url.focus(), 0);
  //   });
  // }

  // _addImage() {
  //   this._promptForMedia('image');
  // }
  showController(){
    setTimeout(function(){
      document.documentElement.scrollTop = document.body.scrollHeight;
    },300);
    this.setState({
      isShowController:true
    })
  }
  hiddenController(){
    this.setState({
      isShowController:false
  })
  }
  render() {
    const {editorState} = this.state;
    const  display=this.state.isShowController?{display:'block'}:{display:'none'};
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
          <div className={styles["RichEditor-box-closebtn"]} onTouchEnd={this.hiddenEditor}>
          </div>
          <div className={className} onClick={this.focus}>
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
              onFocus={this.showController.bind(this)}
              onBlur={this.hiddenController.bind(this)}
              onTab={this.onTab}
              placeholder='请输入...'
              ref='editor'
              spellCheck={true}
              onPaste={(value) => (console.log('paste', value))}/>
          </div>
        </div>
        <div style={display}>
        <div className={styles["RichEditor-control"]}>
          <div className={styles["RichEditor-control-box"]}>
            <MediaControls handleFileInput={this.handleFileInput}/>
            <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle}/>
            <BlockStyleControls editorState={editorState} onToggle={this.toggleBlockType}/>
          </div>
          <div className={styles["RichEditor-control-sendbtn"]}>
            <Button
              disabled={!contentState.hasText()}
              type="primary"
              inline
              size="small"
              style={{padding: '5px 5px', lineHeight: '1.6em'}}
              onTouchEnd={this.logState}>
              发送
            </Button>
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
  return  <Image src={src} />;
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
    height:'100%'
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
//
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
//
// var CreateEditor = React.createClass({
//
//   modules: {
//     toolbar: [
//       ['bold', 'italic', 'underline','strike', 'blockquote'],
//       [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
//       ['link', 'image'],
//       ['clean']
//     ],
//   },
//
//   formats: [
//     'bold', 'italic', 'underline', 'strike', 'blockquote',
//     'list', 'bullet', 'indent',
//     'link', 'image'
//   ],
//
//   render: function() {
//     return (
//       <div className="text-editor">
//         <ReactQuill theme="snow"
//                     modules={this.modules}
//                     formats={this.formats}>
//         </ReactQuill>
//       </div>
//     );
//   },
//
// });
//
// export default CreateEditor