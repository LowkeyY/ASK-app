import React from 'react'
import { Button, Icon, Toast, Modal } from 'antd-mobile'
import {
  Editor,
  Modifier,
  EditorState,
  RichUtils,
  DefaultDraftBlockRenderMap,
  AtomicBlockUtils,
  convertToRaw,
  Entity,
  ContentState,
} from 'draft-js'
import { getLocalIcon, formsubmit } from 'utils'
import EmojiBox from 'components/emoji/index'
import Immutable from 'immutable'
import { stateToHTML } from 'draft-js-export-html'
import MediaControls from './component/mediabox'
import InlineStyleControls from './component/inlinebox'
import BlockStyleControls from './component/blockbox'
import 'draft-js/dist/Draft.css'
import styles from './index.less'

const blockRenderMap = Immutable.Map({
  'center': {
    element: 'div',
  },
})
let toHtmlOptions = { // 转换Html
  blockStyleFn (block) {
/*    if (block.getType() === 'atomic') {
      return {
        attributes: {
          align: 'center',
        },
      }
    }*/
    if (block.getType() === 'blockquote') {
      return {
        attributes: {
          background: '#ddd',
          margin: '10px 0',
        },
      }
    }
  },
  entityStyleFn: (entity) => {
    const entityType = entity.get('type').toLowerCase()
    if (entityType == 'atomic' || entityType == 'image') {
      const {src , data = null, ...other} = entity.getData();
      if(data != null)
        other.width = '500px';
      return {
        element: 'img',
        attributes: {
          src,
          ...other
        },
        style:{
        }
      }
    }
    if (entityType === 'emoji') {
      const {src , alt = ""} = entity.getData()
      return {
        element: 'img',
        attributes: {
          src,
          alt
        },
        style: {
          // Put styles here...
        },
      }
    }
  },
}

class CreateEditor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editorState: this.props.editorState,
      disabled: true,
      isShowController: false,
      isShowEmojiBox: false,
      readOnly: false,
    }

    this.replaceSystemEmoji = (content) => {
      const ranges = [
        '\ud83c[\udf00-\udfff]',
        '\ud83d[\udc00-\ude4f]',
        '\ud83d[\ude80-\udeff]',
      ]
      return content.replace(new RegExp(ranges.join('|'), 'g'), '')
        .replace(/\[\/.+?\]/g, '')
    }

    /*        this.focus = () => {
                console.log(" --- CreateEditor --- focus !!!!!!!!!!");
                this.setState({
                    readOnly: false,
                }, () => {
                    setTimeout(() => this.refs.editor.focus(), 0);
                })
            }*/
    this.focus = () => this.setState({
      isShowEmojiBox: false,
    }, () => {
      setTimeout(this.refs.editor.focus(), 0)
    })
    this.logState = () => { //发送数据
      const { editorState } = this.state,
        currentContent = editorState.getCurrentContent()

      this.props.dispatch({
        type: 'creates/updateState',
        payload: {
          editorState,
        },
      })
/*      console.log(convertToRaw(currentContent));
      console.log(this.replaceSystemEmoji(stateToHTML(currentContent, toHtmlOptions)));*/
      this.props.onSubmit && this.props.onSubmit(
        this.replaceSystemEmoji(stateToHTML(currentContent, toHtmlOptions)),
      )
    }

    this.onChange = (editorState) => this.setState({
      editorState,
    })
    this.onBlur = () => this.props.dispatch({
      type: 'creates/updateState',
      payload: {
        editorState: this.state.editorState,
      },
    })
    this.toggleBlockType = (type) => this._toggleBlockType(type)
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style)
    this.insertImage = (file) => this._insertImage(file)
    this.insertEmoji = (emoji, emojiName , emojiCode) => this._insertEmoji(emoji, emojiName , emojiCode)
    this.handleFileInput = this._handleFileInput.bind(this)
    this.handleUploadImage = () => this._handleUploadImage()
    this.handleKeyCommand = this._handleKeyCommand.bind(this)
  }

  getSubmitDraft () {
    const { editorState } = this.state,
      contents = this.replaceSystemEmoji(stateToHTML(editorState.getCurrentContent(), toHtmlOptions))
    return {
      contents,
    }
  }

  getPreviewValue () { //回显
    const { editorState } = this.state,
      theContents = this.replaceSystemEmoji(stateToHTML(editorState.getCurrentContent(), toHtmlOptions))
    this.props.dispatch({
      type: 'creates/updateState',
      payload: {
        editorState: editorState,
        currentParams: {
          ...this.props.currentParams,
          theContents,
        },
        preivewPlate: this.props.preivewPlate,
      },
    })
  }

  createEditorReset () { //重置状态
    this.props.dispatch({
      type: 'creates/updateState',
      payload: {
        editorState: EditorState.createEmpty(),
      },
    })
  }

  toggleEmojiBox (e) {
    e.stopPropagation()
    // this.refs.editor.blur()
    this.setState({
      isShowEmojiBox: !this.state.isShowEmojiBox,
    })
  }

  setDraftEditorState (editorState) {
    this.setState({
      editorState,
    })
  }

  _handleKeyCommand (command) {
    const { editorState } = this.state
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  _toggleBlockType (blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType,
      ),
    )
  }

  _toggleInlineStyle (inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle,
      ),
    )
  }

  _insertImage (file) { //插入图片
    const { editorState } = this.state
    const contentState = editorState.getCurrentContent(),
      entity = {}
    if (typeof file == 'object') {
      entity.src = URL.createObjectURL(file)
      entity.data = file
    } else {
      entity.src = file
      entity.data = ''
    }
    const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', entity)
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()

    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' ',
      ),
    }, () => {
      setTimeout(() => this.focus(), 0)
    })
  }

  _insertEmoji (url, emojiName , emojiCode = "") { //插入表情
    const contentState = this.state.editorState.getCurrentContent()
    const getEmojiCode = () =>{
      if(emojiCode){
        let codes;
        if(/^(D83D|D83C),/ig.test(emojiCode) && (codes = emojiCode.split(",")).length == 2)
          return unescape(`%u${codes.join('%u')}`);
        if(emojiCode.length ==4)
          return unescape(`%u${emojiCode}`);
      }
      return `[/${emojiName}]`;
    }
    const emoji = getEmojiCode()
    const contentStateWithEntity = contentState
      .createEntity('emoji', 'IMMUTABLE', {
        src: url,
        alt: emojiCode
      })
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const currentSelectionState = this.state.editorState.getSelection()
    let emojiAddedContent
    let emojiEndPos = 0
    let blockSize = 0
    // deciding on the position to insert emoji
    const targetSelection = contentState.getSelectionAfter()
    emojiAddedContent = Modifier.insertText(
      contentState,
      targetSelection,
      emoji,
      null,
      entityKey,
    )
    emojiEndPos = targetSelection.getAnchorOffset()
    const blockKey = targetSelection.getAnchorKey()
    blockSize = contentState.getBlockForKey(blockKey)
      .getLength()
    emojiAddedContent = Modifier.insertText(
      emojiAddedContent,
      emojiAddedContent.getSelectionAfter(),
      '',
    )
    const newEditorState = EditorState.push(
      this.state.editorState,
      emojiAddedContent,
      'insert-emoji',
    )
    this.setState({
      editorState: EditorState.forceSelection(newEditorState, emojiAddedContent.getSelectionAfter()),
      isShowEmojiBox: false,
    })
  }
  ;

  _handleFileInput (e) {
    if (e instanceof Blob) {
      this.insertImage(e)
    } else if (e.target) {
      const fileList = e.target.files,
        _target = e.target
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i],
          isLast = i == fileList.length - 1
        setTimeout(() => {
          this.insertImage(file, isLast)
          if (isLast === true) {
            _target.value = ''
          }
        }, i == 0 ? 0 : i * 50)
      }
    }
  }

  _handleUploadImage () {
    this.refs.fileInput.click()
  }

  showController () {
    const that = this
    this.setState({
      isShowController: true,
    })
  }

  hiddenController () {
    const that = this
    setTimeout(function () {
      that.setState({
        isShowController: false,
      })
    }, 1000)

  }

  render () {
    const { editorState } = this.state
    const display = this.state.isShowController ? {
      display: 'block',
    } : {
      display: 'none',
    }
    let className = styles['RichEditor-editor']
    var contentState = editorState.getCurrentContent()
    if (!contentState.hasText()) {
      if (contentState.getBlockMap()
        .first()
        .getType() !== 'unstyled') {
        className += ' ' + styles['RichEditor-hidePlaceholder']
      }
    }

    return (
      <div className={styles['RichEditor-box']}>
        <div className={styles['RichEditor-root']}>
          <div className={className} style={{ minHeight: cnDeviceHeight - 200 }} onClick={this.focus}>
            <Editor blockStyleFn={getBlockStyle}
                    blockRendererFn={mediaBlockRenderer}
                    blockRenderMap={DefaultDraftBlockRenderMap.merge(blockRenderMap)}
                    editorState={editorState}
                    handlePastedText={(value) => (console.log('paste', value))}
                    handlePastedFiles={this.pasteMedia}
                    handleDroppedFiles={this.pasteMedia}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onChange}
                    onFocus={this.showController.bind(this)}
                    onBlur={this.onBlur}
                    placeholder='请输入...'
                    ref='editor'
                    spellCheck={true} /*readOnly={ this.state.readOnly }*/
                    onPaste={(value) => (console.log('paste', value))}/>
          </div>
        </div>
        <div id="createBbsxBtn" className={styles['RichEditor-out']} style={{ bottom: 0 }}>
          <div className={styles['RichEditor-container']} style={display}>
            <div className={styles['RichEditor-control']}>
              <div className={styles['RichEditor-control-box']} ref="controlbox" onClick={this.focus}>
                <MediaControls handleFileInput={this.handleFileInput} toggleEmojiBox={this.toggleEmojiBox.bind(this)}/>
                <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle}/>
                <BlockStyleControls editorState={editorState} onToggle={this.toggleBlockType}/>
              </div>
              <div className={styles['RichEditor-control-sendbtn']}>
                <Button disabled={!contentState.hasText()}
                        type="primary"
                        inline
                        size="small"
                        style={{ padding: '5px 5px', lineHeight: '1.6em' }}
                        onTouchEnd={this.logState}>
                  发送
                </Button>
              </div>
            </div>
            <EmojiBox isShowEmojiBox={this.state.isShowEmojiBox} insertEmoji={this.insertEmoji}/>
          </div>
        </div>
      </div>
    )
  }

  static defaultProps = {
    isShowEditor: false,
  }
}


function getBlockStyle (block) {
  switch (block.getType()) {
    case 'center':
      return styles['align-center']
    case 'blockquote':
      return styles['blockquote']
    default:
      return null
  }
}

function mediaBlockRenderer (block) {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    }
  }
  return null
}

const Image = (props) => {
  return <img src={props.src} style={styles2.media}/>
}
const Media = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0))
  const { src } = entity.getData()
  const type = entity.getType()
  return <Image src={src}/>
}

const styles2 = {

  media: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
}

CreateEditor.propTypes = {}
export default CreateEditor
