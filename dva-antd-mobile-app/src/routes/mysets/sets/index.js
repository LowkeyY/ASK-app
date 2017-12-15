import { List} from 'antd-mobile';
import styles from './index.less'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
const Item = List.Item;
const defaultImgSrc = require("themes/images/user.png");
let Sets =({dispatch,loading}) =>{

  const PrefixCls = "mysets" , handleChange = ()=> {
      dispatch(routerRedux.push({pathname:"/fontcontrol"}))
  };
  return (
    <div>
      <List className={`${PrefixCls}-list`}>
        <Item>
          <div className={"icon-title-box"}>
            <p className={"icon-title"}>更换头像</p>
            <div className={"icon-img-box"}>
              <img src={defaultImgSrc} alt="icon"/>
            </div>
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
          onClick={handleChange}
         >字体大小</Item>
      </List>
    </div>
  )
};

export default connect(({ sets, loading }) => ({ sets, loading }))(Sets);

