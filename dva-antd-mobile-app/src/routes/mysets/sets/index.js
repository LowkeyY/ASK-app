import { List,ImagePicker} from 'antd-mobile';
import styles from './index.less'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
const Item = List.Item;
const defaultImgSrc = require("themes/images/user.png");
class Sets extends React.Component {
  constructor(){
    super()
  }
  handleChange () {
    this.props.dispatch(routerRedux.push({pathname:"/fontcontrol"}))
  };
  onChange(files){
    this.props.dispatch({
      type:'mysets/updateState' , payload : {img :files}
    })
  }
render(){
  const userIcon=this.props.userIcon
  const PrefixCls = "mysets" ;

  return (
    <div>
      <List className={`${PrefixCls}-list`}>
        <Item>
          <p className={"icon-title"}>头像预览</p>
          <div className={"icon-img-box"}>
            {/*<img src={defaultImgSrc} alt="icon"/>*/}
            <ImagePicker
              files={userIcon}
              onChange={this.onChange.bind(this)}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={true}
              multiple={false}
            />
          </div>
        </Item>
        <Item extra={'系统管理员'}>姓名</Item>
        <Item extra={' - '}>所属部门</Item>
        <Item extra={'20'}>积分</Item>
        <Item extra={'设备资料版主'}>身份</Item>
        <Item extra={'系统管理员，设备资料版主'}>角色</Item>
        <Item extra={'wangfulin@timetang.com'}>邮件</Item>
        <Item
          arrow="horizontal"
          onClick={this.handleChange.bind(this)}
        >字体大小</Item>
      </List>
    </div>
  )
}

};

export default Sets

