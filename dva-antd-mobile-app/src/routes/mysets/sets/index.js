import React from 'react'
// import ReactCoreImageUpload from 'react-core-image-upload';
import FileUpload from 'react-fileupload'
import {List, ImagePicker, Icon} from 'antd-mobile';
import styles from './index.less'
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

const Item = List.Item;
const defaultImgSrc = require("themes/images/user.png");

class Sets extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    // }
  }

  handleChange() {
    this.props.dispatch(routerRedux.push({pathname: "/fontcontrol"}))
  };
  // uploadIcon(){
  //
  // }
  render() {
    const {url, dept, email, integral, name, nickname, roles} = this.props.userInfo
    console.log(this.props.userInfo)
    const PrefixCls = "mysets";
    const options = {
      url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
      baseUrl: 'http://192.168.0.119:8001/sample/test.jcp',
      accept: 'image/*',
      dataType: 'json',
      param: {
        photo_tz_Description: 1,
      },
      fileFieldName: 'photo',
      chooseFile:this.props.changeUserIcon,
    }
    return (
      <div>
        <List className={`${PrefixCls}-list`} ref="chooseBtn">
          <Item>
            <div className={`${PrefixCls}-user-icon-upload`}>
              <FileUpload options={options}>
                <p className={"icon-title"} ref="chooseBtn"><span>更换头像</span></p>
                <div className={"icon-img-box"}>
                  <img src={url} alt="icon"/>
                </div>
              </FileUpload>
            </div>
          </Item>
          <Item extra={name}>姓名</Item>
          <Item extra={dept}>所属部门</Item>
          <Item extra={integral}>积分</Item>
          <Item extra={nickname}>身份</Item>
          <Item extra={roles}>角色</Item>
          <Item extra={email}>邮件</Item>
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

