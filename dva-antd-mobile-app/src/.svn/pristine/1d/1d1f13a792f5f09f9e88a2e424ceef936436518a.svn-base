import { List, InputItem, Switch, Stepper, Range, Button, createTooltip , Toast , TextareaItem , Picker} from 'antd-mobile';
import { createForm } from 'rc-form';
import DemoDraft from '../draft';
import CreateEditor from 'components/createeditor/index'
import styles from './index.less'

const Item = List.Item;
const RangeWithTooltip = createTooltip(Range);
const items=[
  [
  {value:'19',label:'加速器'},
  {value:'2',label:'探测器'},
  {value:'3',label:'扫描控制'},
  {value:'4',label:'扫描装置'},
  {value:'6',label:'软件'},
  {value:'8',label:'综合'},
  {value:'9',label:'其它'},
  {value:'11',label:'图像获取'},
  {value:'12',label:'辐射防护'},
  {value:'13',label:'土建'},
  {value:'14',label:'故障直通车'},
  {value:'15',label:'产品小贴士'},
  {value:'16',label:'保养百问'},
  {value:'18',label:'算法'}
  ]
];
const expert=[
  [
    {value:'19',label:'王小波'},
    {value:'2',label:'李开复'},
    {value:'3',label:'马云'},
    {value:'4',label:'雷军'},
    {value:'6',label:'求伯君'},
    {value:'8',label:'楼天成'},
    {value:'9',label:'詹姆斯'}
  ]
];


class BasicInput extends React.Component {

  state = {
    value: 1,
    isShow:false,
    sValue: [],
    visible: false,
  };

  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        console.log(this.props.form.getFieldsValue());
      } else {
        Toast.fail("请检查表单错误", 3);
      }
    });
  };
  showEditor=()=>function () {//控制选择器
    isShow=!this.setState.isShow;
  };
  hideEditor=()=>function () {
    this.setState.isShow=false;
  };
  onReset = () => {//重置
    this.props.form.resetFields();
  };
  validateAccount = (rule, value, callback) => {
    if (value && value.length > 1) {
      callback();
    } else {
      callback(new Error(''));
    }
  };
  render() {
    const { getFieldProps, getFieldError } = this.props.form,
      PrefixCls="create-list";

    return (
     <div  className={styles[`${PrefixCls}-create-box`]}>
       <div className={styles[`${PrefixCls}-create-formlist`]}>
       <form>
         <List renderHeader={() => ''}
               renderFooter={() => getFieldError('title') && getFieldError('title').join(',')}
         >
           <TextareaItem
             title="标题"
             placeholder="请在此输入标题  ， 最多可输入50个字符"
             autoHeight
             onFocus={this.showEditor}
             onBlur={this.hideEditor}
             {...getFieldProps('title', {
               rules: [
                 { required: true, message: '主题必须输入' },
                 { max: 50, message: '输入内容不能超过50个字符' },
                 { validator: this.validateAccount },
               ],
             })}
             clear
             error={!!getFieldError('title')}
             onErrorClick={() => {
               Toast.fail(getFieldError('title').join('、'), 3);
             }}
           />
           <Picker
                   data={items}
                   cols={1}
                   cascade={false}
                   value={this.state.sValue}
                   onChange={v => this.setState({ sValue: v })}
                   onOk={v => this.setState({ sValue: v })}
                   extra={items[0][0].label}
           >
            <List.Item
              arrow="horizontal">模块</List.Item>
           </Picker>
           <Picker
             data={expert}
             cols={1}
             cascade={false}
             value={this.state.sValue}
             onChange={v => this.setState({ sValue: v })}
             onOk={v => this.setState({ sValue: v })}
             extra={expert[0][0].label}
           >
             <List.Item
               arrow="horizontal">专家</List.Item>
           </Picker>
            <List.Item arrow="horizontal" extra={'李根'||''}>主动邀请</List.Item>
         </List>
       </form>
       </div>

             <div className={styles[`${PrefixCls}-create-editor`]}>
               <CreateEditor/>
             </div>
     </div>
    )
  }
}
export default createForm()(BasicInput);

