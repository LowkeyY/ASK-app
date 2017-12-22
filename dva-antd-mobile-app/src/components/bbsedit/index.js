import { List, InputItem, Switch, Stepper, Range, Button, createTooltip, Toast, TextareaItem, Picker } from 'antd-mobile';
import { createForm } from 'rc-form';
import ReactDOM from 'react-dom';
import SelectMenu from '../selectmenu';
import DemoDraft from '../../routes/test/draft';
import CreateEditor from 'components/createeditor/index'
import styles from './index.less'

const Item = List.Item;
const RangeWithTooltip = createTooltip(Range);
class BbsEdit extends React.Component {

    state = {
        selected: "",
        value: 1,
        top: 0,
    }

    onSubmit = () => {
        this.props.form.validateFields({
            force: true
        }, (error) => {
            if (!error) {
                console.log(this.props.form.getFieldsValue());
            } else {
                Toast.fail("请检查表单错误", 3);
            }
        });
    }
    onReset = () => {
        this.props.form.resetFields();
    }
    validateAccount = (rule, value, callback) => {
        if (value && value.length > 1) {
            callback();
        } else {
            callback(new Error('111'));
        }
    }
    handleSelectClick = (selected = "", ev) => {
        const el = ReactDOM.findDOMNode(this[selected]);
        if (el) {
            this.setState({
                top: el.offsetTop + el.clientHeight + 10,
                selected
            })
        }
        this.props.othersOnChange();
    }
    render() {
        const {getFieldProps, getFieldError} = this.props.form,
            {plates, currentTechs, selectPlate, selectTechs, showSelectMenu, othersOnChange, handleOK, selectedUsers, handleUserSearchClick} = this.props,
            PrefixCls = "bbsedit",
            {selected} = this.state;
        const defaultSelectedProps = {
                plateselect: {
                    items: plates,
                    values: [selectPlate],
                    multiSelect: false,
                    onOk: (data) => {
                        handleOK({
                            selectPlate: data,
                            showSelectMenu: true
                        })
                    }
                },
                techselect: {
                    items: currentTechs,
                    values: selectTechs,
                    multiSelect: true,
                    onOk: (data) => {
                        othersOnChange({
                            selectTechs: data
                        })
                    }
                }
            },
            menuProps = {
                ...defaultSelectedProps[selected],
                onCancel: othersOnChange,
                targetRef: this[selected]
            };

        const getValue = (key) => {
            let value = "";
            switch (key) {
            case "plateselect": {
                plates.map(_ => {
                    if (_.value == selectPlate)
                        value = _.label
                })
                return value || "请选择版块"
            }
            case "techselect": {
                value = [];
                currentTechs.map(_ => {
                    if (selectTechs.includes(_.value))
                        value.push(_.label)
                })
                return value.length ? value.join(",") : "请选择技术专家"
            }
            case "usersselect": {
                value = [];
                selectedUsers.map(_ => {
                    value.push(_.name)
                })
                return value.length ? value.join(",") : "可添加主动邀请人"
            }
            }
        }
        //InputItem
        return (
            <div style={ { height: '40%' } } className={ styles["selectmenu-box"] }>
              <form>
                <List renderFooter={ () => getFieldError('title') && getFieldError('title').join(',') }>
                  <TextareaItem
                                title="标题"
                                placeholder="请在此输入标题  ， 最多可输入50个字符"
                                style={ { textAlign: "right" } }
                                autoHeight
                                {...getFieldProps( 'title', { rules: [{ required: true, message: '主题必须输入' }, { max: 50, message: '输入内容不能超过50个字符' }, { min: 6, message: '输入内容不能少于6个字符' },], })}
                                clear
                                error={ !!getFieldError('title') }
                                onErrorClick={ () => {
                                                   Toast.fail(getFieldError('title').join('、'), 3);
                                               } } />
                  <List.Item
                             onClick={ this.handleSelectClick.bind(null, "plateselect") }
                             arrow={ showSelectMenu && selected == "plateselect" ? "up" : "down" }
                             extra={ getValue("plateselect") }
                             ref={ el => this.plateselect = el }>
                    模块
                  </List.Item>
                  <List.Item
                             onClick={ this.handleSelectClick.bind(null, "techselect") }
                             arrow={ showSelectMenu && selected == "techselect" ? "up" : "down" }
                             extra={ getValue("techselect") }
                             wrap
                             ref={ el => this.techselect = el }>
                    技术专家
                  </List.Item>
                  <List.Item
                             onClick={ handleUserSearchClick }
                             arrow="horizontal"
                             wrap
                             extra={ getValue("usersselect") }>
                    主动邀请
                  </List.Item>
                  <Item className={ styles["my-draft-list"] }>
                    <CreateEditor />
                  </Item>
                </List>
              </form>
              { showSelectMenu && selected ? <SelectMenu {...menuProps}/> : "" }
            </div>
        )
    }
}

export default createForm()(BbsEdit);