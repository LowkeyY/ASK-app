import {
  List,
  NavBar,
  InputItem,
  Popover,
  Icon,
  Switch,
  Stepper,
  Range,
  Button,
  createTooltip,
  Toast,
  TextareaItem,
  Picker,
  ActivityIndicator,
  Checkbox,
  Radio,
  ActionSheet,
  Modal,
} from 'antd-mobile'
import { createForm } from 'rc-form'
import ReactDOM from 'react-dom'
import SelectMenu from '../selectmenu'
import CreateEditor from 'components/createeditor/index'
import { EditorState, convertFromHTML, ContentState, CompositeDecorator , convertToRaw} from 'draft-js'
import { getLocalIcon } from 'utils'
import { routerRedux } from 'dva/router'
import styles from './index.less'

const Item = List.Item,
  CheckboxItem = Checkbox.CheckboxItem,
  RadioItem = Radio.RadioItem,
  RangeWithTooltip = createTooltip(Range),
  PrefixCls = 'bbsedit'

class BbsEdit extends React.Component {
  constructor (props) {
    super(props)
  }

  state = {
    selected: '',
    value: 1,
    top: 0,
    height: 0,
    visible: false,
    modalShow: false,
  }

  getAddUser = (users = []) => {
    const result = []
    users.map(_ => {
      result.push(_.value)
    })
    return result.join('|')
  }
  onSubmit = (contents) => {
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        const { thePlate, theTechs, theUsers } = this.props.currentParams
        const data = {
          ...this.props.form.getFieldsValue(),
          boardId: thePlate,
          selectTechs: theTechs.join('|'),
          addUsers: this.getAddUser(theUsers),
          contents,
          emailControl: this.props.emailControl,
          draftId: this.props.draftId,
        }
        this.props.showAnimating() //ActivityIndicator显示

        this.props.onFormSubmit(data)

      } else {
        Toast.fail('请检查表单错误', 3)
      }
    })
  }
  showActionSheet = () => {
    const contents = this.refs.createEditor.state.editorState.getCurrentContent()
    const BUTTONS = ['不保存草稿', '保存草稿', '取消']
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      destructiveButtonIndex: BUTTONS.length - 2,
      maskClosable: true,
      'data-seed': 'logId',
    }, (buttonIndex) => {
      const { contents} = this.refs.createEditor.getSubmitDraft(),
        { thePlate, theTechs, theUsers } = this.props.currentParams,
        params = {
          ...this.props.form.getFieldsValue(),
          contents,
          boardId: thePlate,
          selectTechs: theTechs.join('|'),
          addUsers: this.getAddUser(theUsers),
          emailControl: this.props.emailControl,
        }
      if (buttonIndex === 0) {
        this.props.dispatch(routerRedux.goBack())
      } else if (buttonIndex === 1) {
        this.props.onSubmitDraft(params)
      }
    })
  }
  goBack = () => {
    const hasText = this.refs.createEditor.state.editorState.getCurrentContent().hasText();
    hasText ? this.showActionSheet() : this.props.dispatch(routerRedux.goBack());
  }

  onReset = () => {
    const emptyEditorState = this.getEditorStateFormHtml("");
    this.refs.createEditor.onChange(emptyEditorState)
    this.setState({
      visible: false,
    })
    this.props.dispatch({
      type: 'creates/updateState',
      payload: {
        editorState: emptyEditorState,
      },
    })
  }

  handleSelectClick = (selected = '', ev) => {
    this.setState({
      selected,
    })
    this.props.othersOnChange()
  }

  handlePreviewClick = () => { //预览
    const { thePlate, theTechs, theUsers } = this.props.currentParams

    const data = {
      ...this.props.form.getFieldsValue(),
      boardId: thePlate,
      selectTechs: theTechs.join('|'),
      addUsers: this.getAddUser(theUsers),
      emailControl: this.props.emailControl,
      draftId: this.props.draftId,
    }
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        this.refs.createEditor.getPreviewValue() //保存参数到store

        this.props.dispatch(routerRedux.push({
          pathname: '/preview',
        }))
      } else {
        Toast.fail('请编辑帖子', 2)
      }
    })
    this.setState({
      visible: false,
    })
  }

  handleVisbleCange = () => {
    this.setState({
      visible: false,
    })
  }

  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    })

  }

  getEditorStateFormHtml = (content) => {
    if (content != '') {
      console.log(content);
      const blocksFromHTML = convertFromHTML(content)
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
      )
      console.log(convertToRaw(state));
      return EditorState.createWithContent(state)
    }
    return EditorState.createEmpty()
  }

  componentWillReceiveProps = () => {
    const { draftId, draftContents, handleLoadDraft, draftCompleted } = this.props,
      { modalShow } = this.state
    if (!modalShow && !draftCompleted && typeof (draftId) == 'string' && draftId.length > 0) {
      this.setState({
        modalShow: true,
      })
      Modal.alert('', '是否载入草稿？', [
        {
          text: '取消',
          onPress: () => { //取消时，清除draftId
            handleLoadDraft()
          },
        },
        {
          text: '载入草稿',
          onPress: () => {
            const draftEditorState = this.getEditorStateFormHtml(draftContents)
            this.refs.createEditor.onChange(draftEditorState)
            handleLoadDraft(draftEditorState)
          },
        },
      ])
    }
  }

  componentDidMount = () => { // 自适应高度
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight

    const selectMeunHeight = this.refs.selectMeun && this.refs.selectMeun.clientHeight
    this.setState({
      height: clientHeight - (selectMeunHeight + 90),
    })
  }

  // handleEmailControl = () => { //邮件提醒
  //
  //     this.props.dispatch({
  //         type: 'creates/updateState',
  //         payload: {
  //             emailControl: !this.props.emailControl
  //         }
  //     })
  // }

  render () {
    const { getFieldProps, getFieldError, resetFields } = this.props.form,
      { title = '' } = this.props.form.getFieldsValue(),
      { plates, currentTechs, showSelectMenu, othersOnChange, handleOK, handleUserSearchClick, currentParams, animating } = this.props,
      PrefixCls = 'bbsedit',
      { selected } = this.state,
      { theTitle, thePlate, theTechs, theUsers, theContents } = currentParams
    const defaultSelectedProps = {
        plateselect: {
          items: plates,
          values: thePlate,
          multiSelect: false,
          onOk: (data) => {
            handleOK({
              selectPlate: data,
              showSelectMenu: true,
            })
          },
        },
        techselect: {
          items: currentTechs,
          values: theTechs,
          multiSelect: true,
          onOk: (data) => {
            othersOnChange({
              theTechs: data,
            })
          },
        },
      },
      menuProps = {
        ...defaultSelectedProps[selected],
        onCancel: othersOnChange,
        targetRef: this[selected],
      }

    const getValue = (key) => {
      let value = ''
      switch (key) {
        case 'plateselect': {
          plates.map(_ => {
            if (_.value == thePlate) {
              value = _.label
            }
          })
          return value || '请选择版块'
        }
        case 'techselect': {
          value = []
          currentTechs.map(_ => {
            if (theTechs.includes(_.value)) {
              value.push(_.label)
            }
          })
          return value.length ? value.join(',') : '请选择技术专家'
        }
        case 'usersselect': {
          value = []
          theUsers.map(_ => {
            value.push(_.name)
          })
          return value.length ? value.join(',') : '可添加主动邀请人'
        }
      }
    }
    const preivewPlate = getValue('plateselect')
    const createEditorProps = {
      preivewPlate,
      editorState: this.props.editorState,
      currentParams: this.props.currentParams,
      title,
      dispatch: this.props.dispatch,
      onSubmit: this.onSubmit,
      height: this.state.height,
      isChange: this.props.isChange,
    }
    //InputItem
    return (
      <div>
        <div id="createBbsxHeader" style={{ top: 0 }} className={styles[`${PrefixCls}-header`]}>
          <NavBar leftContent="返回"
                  mode="light"
                  onLeftClick={this.goBack}
                  rightContent={<Popover mask
                                         visible={this.state.visible}
                                         overlayClassName="fortest"
                                         overlayStyle={{ color: 'currentColor' }}
                                         overlay={[(<Item key="5" value="special" style={{ whiteSpace: 'nowrap' }}>
                                           <div className={styles[`${PrefixCls}-send-btn-box`]}
                                                onClick={this.handlePreviewClick.bind(this)}><Icon
                                             type={getLocalIcon('/page/preview.svg')}/><span>预览</span></div>
                                         </Item>), (<Item key="6" value="button ct">
                                           <div onClick={this.onReset.bind(this)}
                                                className={styles[`${PrefixCls}-send-btn-box`]}><Icon
                                             type={getLocalIcon('/page/reset.svg')}/><span>重置</span></div>
                                         </Item>), (<Item key="7" value="button ct">
                                           <div onClick={this.handleVisbleCange.bind(this)}
                                                className={styles[`${PrefixCls}-send-btn-box`]}><Icon
                                             type={getLocalIcon('/page/cancel.svg')}/><span>取消</span></div>
                                         </Item>)]}
                                         align={{ overflow: { adjustY: 0, adjustX: 0 }, offset: [-10, 0] }}

                                         onVisibleChange={this.handleVisibleChange}>
                    <div style={{
                      height: '100%',
                      padding: '0 15px',
                      marginRight: '-15px',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                      <Icon type="ellipsis"/>
                    </div>
                  </Popover>}>
            发帖
          </NavBar>
        </div>
        <div className={styles['selectmenu-box']}>
          <form>
            <List>
              <div className={`${PrefixCls}-top`} ref='selectMeun'>
                <TextareaItem title="标题"
                              placeholder="标题 , 最多可输入50个字符"
                              style={{ textAlign: 'right' }}
                              autoHeight
                              {...getFieldProps('title', {
                                initialValue: theTitle,
                                rules: [{ required: true, message: '标题必须输入' }, {
                                  max: 50,
                                  message: '标题长度限制为1-50字符',
                                }, { min: 1, message: '输入内容不能少于1个字符' }],
                              })}
                              clear
                              error={!!getFieldError('title')}
                              onChange={(value) => {
                                resetFields()
                                this.props.titleOnChange(
                                  value,
                                )
                              }}
                              onErrorClick={() => {
                                Toast.fail(getFieldError('title')
                                  .join('、'), 3)
                              }}/>
                <List.Item onClick={this.handleSelectClick.bind(null, 'plateselect')}
                           arrow={showSelectMenu && selected == 'plateselect' ? 'up' : 'down'}
                           extra={getValue('plateselect')}
                           ref={el => this.plateselect = el}>
                  模块
                </List.Item>
                <List.Item onClick={this.handleSelectClick.bind(null, 'techselect')}
                           arrow={showSelectMenu && selected == 'techselect' ? 'up' : 'down'}
                           extra={getValue('techselect')}
                           wrap
                           ref={el => this.techselect = el}>
                  技术专家
                </List.Item>
                <List.Item onClick={handleUserSearchClick}
                           arrow="horizontal"
                           wrap
                           extra={getValue('usersselect')}>
                  主动邀请
                </List.Item>
                {/*<RadioItem checked={this.props.emailControl} onClick={this.handleEmailControl.bind(this)}>*/}
                {/*邮件提醒*/}
                {/*</RadioItem>*/}
                {/*<CheckboxItem defaultChecked={ false } checked={ this.props.emailControl } onChange={ this.handleEmailControl.bind(this) }>*/}
                {/*</CheckboxItem>*/}
              </div>
            </List>
          </form>
          <CreateEditor {...createEditorProps} ref='createEditor'/>
          {showSelectMenu && selected ? <SelectMenu {...menuProps}/> : ''}
        </div>
        <ActivityIndicator animating={animating} toast text="请等待..."/>
      </div>
    )
  }
}

export default createForm()(BbsEdit);
