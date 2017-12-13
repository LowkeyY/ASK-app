import { List, InputItem, Switch, Stepper, Range, Button, createTooltip , Toast , TextareaItem , Picker} from 'antd-mobile';
import { createForm } from 'rc-form';
import DemoDraft from '../draft';
import styles from './index.less'

const Item = List.Item;
const RangeWithTooltip = createTooltip(Range);
const items=[
  {value:'19',text:'加速器'},
  {value:'2',text:'探测器'},
  {value:'3',text:'扫描控制'},
  {value:'4',text:'扫描装置'},
  {value:'6',text:'软件'},
  {value:'8',text:'综合'},
  {value:'9',text:'其它'},
  {value:'11',text:'图像获取'},
  {value:'12',text:'辐射防护'},
  {value:'13',text:'土建'},
  {value:'14',text:'故障直通车'},
  {value:'15',text:'产品小贴士'},
  {value:'16',text:'保养百问'},
  {value:'18',text:'算法'}
]
class BasicInput extends React.Component {
  state = {
    value: 1,
  }
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
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
  render() {
    const { getFieldProps, getFieldError } = this.props.form,
      PrefixCls="demo-list";

    return (
     <div style={{height:'100%'}}>
       <form>
         <List renderHeader={() => ''}
               renderFooter={() => getFieldError('title') && getFieldError('title').join(',')}
         >
           <TextareaItem
             title="标题"
             placeholder="请在此输入标题  ， 最多可输入50个字符"
             autoHeight
             {...getFieldProps('title', {
               rules: [
                 { required: true, message: '主题必须输入' },
                 { max: 50, message: '输入内容不能超过50个字符' },
                 { min: 6, message: '输入内容不能超过6个字符' },
               ],
             })}
             clear
             error={!!getFieldError('title')}
             onErrorClick={() => {
               Toast.fail(getFieldError('title').join('、'), 3);
             }}
           />
           <Picker data={""} cols={1} extra="请选择发帖模块">
            <List.Item arrow="horizontal">模块</List.Item>
           </Picker>
           <Picker data={""} cols={1} extra="请添加主动邀请人">
            <List.Item arrow="horizontal">主动邀请</List.Item>
           </Picker>
{/*           <Item
             arrow="horizontal"
           >
             系统推荐
           </Item>*/}
           <Item
           >
             是否通知邀请人：
             <span style={{marginRight:'20Px'}}><input type="radio" name="check" checked style={{width:'20px',height:'20px'}}/>是</span>
             <span><input type="radio" name="check" style={{width:'20px',height:'20px'}}/>否</span>
           </Item>
           <Item className={styles["my-draft-list"]}>
             <DemoDraft {...getFieldProps('contents', { valuePropName: 'checked' })}/>
           </Item>
           <Item>
             <Button type="primary" onClick={this.onSubmit} inline>提交</Button>
             <Button onClick={this.onReset} inline style={{ marginLeft: 5 }}>重置</Button>
             <Button onClick={this.onReset} inline className={styles[`${PrefixCls}-preview-btn`]}>预览</Button>
           </Item>
         </List>
       </form>
     </div>
    )
  }
}

export default createForm()(BasicInput);

