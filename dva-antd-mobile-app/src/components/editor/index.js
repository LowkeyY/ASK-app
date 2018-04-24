import React from 'react';
import { Button, Icon, Checkbox } from 'antd-mobile';
import { Editor, EditorState, Modifier, RichUtils, DefaultDraftBlockRenderMap, AtomicBlockUtils, convertToRaw, Entity, ContentState, convertFromHTML, CompositeDecorator } from 'draft-js';
import { getLocalIcon } from 'utils'
import { stateToHTML } from 'draft-js-export-html';
import Immutable from 'immutable';
import MediaControls from './component/mediabox'
import InlineStyleControls from './component/inlinebox'
import BlockStyleControls from './component/blockbox'
import EmojiBox from 'components/emoji/index'
import "draft-js/dist/Draft.css";
import styles from './index.less'
import { routerRedux } from 'dva/router';

const AgreeItem = Checkbox.AgreeItem;
const blockRenderMap = Immutable.Map({
    'center': {
        element: 'span',
    }
});
let toHtmlOptions = { // 转换Html
    blockStyleFn(block) {
        if (block.getType() === 'atomic') {
            return {
                attributes: {
                  align: 'center',
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
        if (entityType == 'image' || entityType == 'atomic') {
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
          };
        }
    },
}

class MyEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: this.props.editorState,
            showEditor: true, //控制display
            disabled: true,
            isShowEmojiBox: false,
            emailControl: true,
            imgControl: false,
        };
        this.replaceSystemEmoji = (content) => {
            const ranges = [
                '\ud83c[\udf00-\udfff]',
                '\ud83d[\udc00-\ude4f]',
                '\ud83d[\ude80-\udeff]'
            ];
            return content.replace(new RegExp(ranges.join('|'), 'g'), '').replace(/\[\/.+?\]/g, '');
        }

      this.focus = () => this.setState({
        isShowEmojiBox: false,
      }, () => {
        setTimeout(this.refs.editor.focus(), 0)
      })
        this.logState = () => { //发送数据
            const emailControl = this.state.emailControl,
                imgControl = this.state.imgControl;
            const currentContent = this.state.editorState.getCurrentContent(),
                {entityMap} = convertToRaw(currentContent),
                entityParam = {};
            Object.keys(entityMap).map(key => {
                const entity = entityMap[key];
                if (entity && entity.data && entity.data.data)
                    entityParam[entity.data.src.replace(/[^a-z0-9-]/g, "")] = entity.data.data
            });
            this.props.onSubmit && this.props.onSubmit(this.replaceSystemEmoji(stateToHTML(currentContent, toHtmlOptions)), entityParam, emailControl, imgControl);
            this.setState({
                editorState: EditorState.createEmpty(),
            })
        };

        this.onChange = (editorState) => this.setState({
            editorState
        });
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
        this.insertImage = (file) => this._insertImage(file);
        this.insertEmoji = (emoji, emojiName , emojiCode) => this._insertEmoji(emoji, emojiName , emojiCode)
        this.handleFileInput = this._handleFileInput.bind(this);
        this.handleUploadImage = () => this._handleUploadImage();
        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.emailControl = this.emailControl.bind(this);
        this.addInviter = this.addInviter.bind(this)
    }

    toggleEmojiBox(e) {
        e.stopPropagation()
        this.setState({
            isShowEmojiBox: !this.state.isShowEmojiBox
        })
        this.refs.editor.blur()
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

    _handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _insertImage(file) { //插入图片
        const {editorState} = this.state;
        const contentState = editorState.getCurrentContent();
        const fileSrc = typeof file == "object" ? URL.createObjectURL(file) : file;
        const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', {
            src: fileSrc,
            data: file
        })
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

        const newEditorState = EditorState.set(
            editorState,
            {
                currentContent: contentStateWithEntity
            }
        );
        this.setState({
            editorState: AtomicBlockUtils.insertAtomicBlock(
                newEditorState,
                entityKey,
                ' '
            ),
        });
    }

    _insertEmoji(url, emojiName , emojiCode = "") { //插入表情
        const decorator = new CompositeDecorator([
            {
                strategy: findImageEntities,
                component: Emoji,
            }
        ]);
        const contentState = this.state.editorState.getCurrentContent();
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
            });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const currentSelectionState = this.state.editorState.getSelection();
        let emojiAddedContent;
        let emojiEndPos = 0;
        let blockSize = 0;
        // 定位光标
        const targetSelection = contentState.getSelectionAfter();
        emojiAddedContent = Modifier.insertText(
            contentState,
            targetSelection,
            emoji,
            null,
            entityKey,
        );
        emojiEndPos = targetSelection.getAnchorOffset();
        const blockKey = targetSelection.getAnchorKey();
        blockSize = contentState.getBlockForKey(blockKey).getLength();
        emojiAddedContent = Modifier.insertText(
            emojiAddedContent,
            emojiAddedContent.getSelectionAfter(),
            '',
        );
        const newEditorState = EditorState.push(
            this.state.editorState,
            emojiAddedContent,
            'insert-emoji',
        );
        this.onChange(EditorState.forceSelection(newEditorState, emojiAddedContent.getSelectionAfter()));
        this.setState({ //隐藏emoji box
            isShowEmojiBox: false
        })
    };

    _handleFileInput(e) {
        if (e instanceof Blob) {
            this.insertImage(e);
        } else if (e.target) {
            const fileList = e.target.files,
                _target = e.target;
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i],
                    isLast = i == fileList.length - 1;
                setTimeout(() => {
                    this.insertImage(file);
                    if (isLast === true) {
                        _target.value = "";
                    }
                }, i == 0 ? 0 : i * 50);
            }
        }
    }

    _handleUploadImage() {
        this.refs.fileInput.click();
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


    lostFocus() {
        this.refs.editor.blur()
    }
    emailControl() { //邮件提醒
        this.setState({
            emailControl: !this.state.emailControl
        })
    }

    addInviter() {
        this.props.dispatch(routerRedux.push({
            pathname: "/searchuser",
            query: {
                tragetState: "details"
            }
        }));
        this.props.dispatch({
            type: 'details/updateState',
            payload: {
                isShowEditor: this.props.isShowEditor,
                editorState: this.state.editorState
            }
        })
    }
    getInviters(inviters) {
        let inviterArr = [];
        if (Array.isArray(inviters)) {
            inviters.map((i) => {
                inviterArr.push(i.name)
            })
        }
        return inviterArr.join(",")
    }
    componentDidMount() {
        const that = this
        this.refs.mask.ontouchstart = function(e) {
            if (typeof(e.target.className) == "string" && e.target.className.indexOf("mask") > 0) {
                e.preventDefault()
                that.props.dispatch({
                    type: 'details/updateState',
                    payload: {
                        isShowEditor: false,
                        isShowInputFoot:true
                    }
                })
                that.refs.editor.blur()
            }
        }
    }
    render() {
        const {editorState} = this.state,
            theUsers = this.props.theUsers,
            display = this.props.isShowEditor ? 'block' : 'none';
        let className = styles['RichEditor-editor'];
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' ' + styles['RichEditor-hidePlaceholder'];
            }
        }
        return (
            <div className={ styles["RichEditor-mask"] }
              id="createCommentBtnnoscroll"
              style={ { display: display, top: 0 } }
              ref='mask'>
              <div className={ styles["RichEditor-box-header"] } ref="editorbox">
                <div className={ styles["RichEditor-box"] } >
                  <div className={ styles["RichEditor-root"] }>
                    <div className={ styles["RichEditor-emailcontrol"] }>
                      { /*<AgreeItem checked={ this.state.emailControl } onChange={ this.emailControl }>*/ }
                      { /*<span className={ styles['RichEditor-emailcontrol-text'] }>邮件提醒</span>*/ }
                      { /*</AgreeItem>*/ }
                      <span className={ styles["RichEditor-addInviter"] } onClick={ this.addInviter }>{ theUsers.length === 0 ? '添加邀请人' : `已邀请:${this.getInviters(theUsers)}` }</span>
                    </div>
                    <div className={ styles["RichEditor-box-closebtn"] } onClick={ this.hiddenEditor }>
                      <Icon type={ getLocalIcon('/editor/close.svg') } size="lg" />
                    </div>
                    <div className={ styles["RichEditor-editor-box"]}>
                      <div className={ className } onClick={ this.focus }>
                        <Editor blockStyleFn={ getBlockStyle }
                          blockRendererFn={ mediaBlockRenderer } /* blockRenderMap={DefaultDraftBlockRenderMap.merge(blockRenderMap)}*/
                          editorState={ editorState }
                          handlePastedText={ (value) => (console.log('paste', value)) }
                          onChange={ this.onChange }
                          handleKeyCommand={ this.handleKeyCommand }
                          placeholder={ this.props.placeholder }
                          ref='editor'
                          spellCheck={ true }
                          onPaste={ (value) => (console.log('paste', value)) } />
                      </div>
                    </div>
                    <div className={ styles["RichEditor-container"] }>
                      <div className={ styles["RichEditor-control"] }>
                        <div className={ styles["RichEditor-control-box"] } onClick={ this.focus }>
                          <MediaControls handleFileInput={ this.handleFileInput } toggleEmojiBox={ this.toggleEmojiBox.bind(this) } />
                          <InlineStyleControls editorState={ editorState } onToggle={ this.toggleInlineStyle } />
                          <BlockStyleControls editorState={ editorState } onToggle={ this.toggleBlockType } />
                        </div>
                        <div className={ styles["RichEditor-control-sendbtn"] }>
                          <Button disabled={ !contentState.hasText() }
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
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
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
            return (
                entityKey !== null &&
                Entity.get(entityKey).getType() === 'EMOJI'
            );
        },
        callback
    );
}

const Emoji = (props) => {
    const {height, src, width, } = props.contentState.getEntity(props.entityKey).getData();
    return (

        <span style={ { backgroundImage: `url(${src})`, width: '25px', height: '25px', display: 'inline-block' } }></span>
        );
};
const styles2 = {
    media: {
        maxWidth: '100%',
    },

}


MyEditor.propTypes = {}

export default MyEditor;
