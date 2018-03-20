import React from 'react';
import { Button, Icon } from 'antd-mobile';
import { Editor, EditorState, Modifier, RichUtils, DefaultDraftBlockRenderMap, AtomicBlockUtils, convertToRaw, Entity, ContentState, convertFromHTML,CompositeDecorator} from 'draft-js';
import { getLocalIcon } from 'utils'
import { stateToHTML } from 'draft-js-export-html';
import Immutable from 'immutable';
import MediaControls from './component/mediabox'
import InlineStyleControls from './component/inlinebox'
import BlockStyleControls from './component/blockbox'
import EmojiBox from 'components/emoji/index'
import "draft-js/dist/Draft.css";
import styles from './index.less'

const blockRenderMap = Immutable.Map({

    'center': {
        element: 'span',
    },
    'atomic': {
        element: 'span',
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
        } else if (block.getType() === 'blockquote') {
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
        if (entityType === 'image') {
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
      //   if (entityType === 'emoji') {
      //   const data = entity.getData();
      //   return {
      //     element: 'img',
      //     attributes: {
      //       src: data.src,
      //     },
      //     style: {
      //       // Put styles here...
      //     },
      //   };
      // }
    },
}

class MyEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
            showEditor: true, //控制display
            disabled: true,
            isShowEmojiBox: false
        };

        this.focus = () => this.refs.editor.focus();
        this.logState = () => { //发送数据
          console.log(stateToHTML(this.state.editorState.getCurrentContent(), options))
            const content = this.state.editorState;
            this.props.onSubmit && this.props.onSubmit(stateToHTML(this.state.editorState.getCurrentContent(), options));
          this.setState({
            editorState:  EditorState.createEmpty()
          })

        };

        this.onChange = (editorState) => this.setState({
            editorState
        });
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
        this.insertImage = (file) => this._insertImage(file);
        this.insertEmoji = (emoji) => this._insertEmoji(emoji)
        this.handleFileInput = this._handleFileInput.bind(this)
        this.handleUploadImage = () => this._handleUploadImage();

    }

    toggleEmojiBox() {
     this.refs.editor.blur()
        this.setState({
            isShowEmojiBox: !this.state.isShowEmojiBox
        })
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

    _insertImage(file) { //插入图片
        const {editorState} = this.state;
        const contentState = editorState.getCurrentContent();
        const fileSrc = typeof file == "object" ? URL.createObjectURL(file) : file;
        const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', {
            src: fileSrc,
        })
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        this.onChange(AtomicBlockUtils.insertAtomicBlock(
            this.state.editorState,
            entityKey,
            ' '
        ));

    }

    _insertEmoji(url) {//插入表情
      const decorator = new CompositeDecorator([
        {
          strategy: findImageEntities,
          component: Emoji,
        }
      ]);
        const emoji = '<img src="' + url + '"/>';
        const {editorState} = this.state;
        var contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState
            .createEntity('emoji', 'IMMUTABLE', {
                src: url
            });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const currentSelectionState = this.state.editorState.getSelection();
        let emojiAddedContent;
        const afterRemovalContentState = Modifier.removeRange( //从编辑器中删除整个范围的文本
            contentState,
            currentSelectionState,
        );
        const targetSelection = afterRemovalContentState.getSelectionAfter();
        emojiAddedContent = Modifier.insertText(
            afterRemovalContentState,
            targetSelection,
            ' sdfdsf',
            null,
            entityKey,
        );
        const blocksFromHTML = convertFromHTML(emoji);
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap,
        );
      this.state = {
        editorState: EditorState.createWithContent(
          state,
          decorator,
        ),
      };

      const newEditorState = EditorState.push(
              editorState,
        emojiAddedContent
        );

        this.onChange(this.state.editorState)

    }
    ;

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

    goBottom() {
       setTimeout(function() {
         document.documentElement.scrollTop = document.body.scrollHeight;
       }, 300);
    }


    hiddenEditor = () => {
        this.props.dispatch({
            type: 'details/updateState',
            payload: {
                isShowInputFoot: true,
                isShowEditor: false
            }
        })
    }

    render() {
        const {editorState} = this.state;
        const display = this.props.isShowEditor ? {
            display: 'block'
        } : {
            display: 'none'
        };
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
            <div className={ styles["RichEditor-box-header"] } style={ display }>
              <div className={ styles["RichEditor-box"] }>
                <div className={ styles["RichEditor-root"] }>
                  <div className={ styles["RichEditor-box-closebtn"] } onClick={ this.hiddenEditor }>
                    <Icon type={ getLocalIcon('/editor/close.svg') } size="lg"/>
                  </div>
                  <div className={ className } onClick={ this.focus }>
                    <Editor
                            blockStyleFn={ getBlockStyle }
                            blockRendererFn={ mediaBlockRenderer }
                            blockRenderMap={ DefaultDraftBlockRenderMap.merge(blockRenderMap) }
                            editorState={ editorState }
                            handlePastedText={ (value) => (console.log('paste', value)) }
                            onChange={ this.onChange }
                            onFocus={ this.goBottom }
                            placeholder={ this.props.placeholder }
                            ref='editor'
                            spellCheck={ true }
                            onPaste={ (value) => (console.log('paste', value)) }
                    />

                  </div>
                  <div className={ styles["RichEditor-container"] }>
                    <div className={ styles["RichEditor-control"] }>
                      <div className={ styles["RichEditor-control-box"] } onClick={ this.focus}>
                        <MediaControls handleFileInput={ this.handleFileInput } toggleEmojiBox={ this.toggleEmojiBox.bind(this) } />
                        <InlineStyleControls editorState={ editorState } onToggle={ this.toggleInlineStyle } />
                        <BlockStyleControls editorState={ editorState } onToggle={ this.toggleBlockType } />
                      </div>
                      <div className={ styles["RichEditor-control-sendbtn"] }>
                        <Button
                                disabled={ !contentState.hasText() }
                                type="primary"
                                inline
                                size="small"
                                style={ { padding: '5px 5px', lineHeight: '1.6em' } }
                                onClick={ this.logState }>
                          发送
                        </Button>
                      </div>
                    </div>
                    <EmojiBox isShowEmojiBox={ this.state.isShowEmojiBox } insertEmoji={ this.insertEmoji } />
                  </div>
                </div>
              </div>
            </div>
            );
    }

    static defaultProps = {
        isShowEditor: false
    };
}


function getBlockStyle(block) {
    switch (block.getType()) {
    case 'center':
        return styles['align-center'];
    case 'blockquote':
        return styles['blockquote'];
    default:
        return null;
    }
}

function mediaBlockRenderer(block) {
    if (block.getType() === 'atomic') {
        return {
            component: Media,
            editable: false,
        };
    }

    return null
}

const Image = (props) => {
    return <img src={ props.src } style={ props.style } />;
};
const Media = (props) => {
    const entity = Entity.get(props.block.getEntityAt(0));
    const {src} = entity.getData();
    const type = entity.getType();
    if (type === 'image') {
        return <Image src={ src } style={ styles2.media } />;
    }

};
function findImageEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      console.log( Entity.get(entityKey).getType())
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'EMOJI'
      );
    },
    callback
  );
}
const Emoji = (props) => {
  const {
    height,
    src,
    width,
  } = props.contentState.getEntity(props.entityKey).getData();
  return (

    <span style={{backgroundImage:`url(${src})`,width:'25px',height:'25px',display:'inline-block'}}></span>
  );
};
const styles2 = {
    media: {
        maxWidth: '100%',
    },

}


MyEditor.propTypes = {}

export default MyEditor;
