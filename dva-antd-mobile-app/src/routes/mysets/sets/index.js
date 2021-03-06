import React from 'react'
import FileUpload from 'react-fileupload'
import { List, ImagePicker, Icon, ActivityIndicator, Toast } from 'antd-mobile';
import { getUserAvatar, config, getApiParams, getUserAvatarError } from 'utils'
import styles from './index.less'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import doUserAvatarUpload from 'utils/formsubmit'

const Item = List.Item,
    {baseURL, api: {userAvatar}} = config;

class Sets extends React.Component {
    constructor(props) {
        super(props)
    }
    handleChange() {
        this.props.dispatch(routerRedux.push({
            pathname: "/fontcontrol",
            query: {
                fontSize: this.props.userInfo.pageFontsize
            }
        }))
    }
    render() {
        const {userPic, depts, emails, integral, userName, grade, roles} = this.props.userInfo;
        const PrefixCls = "mysets";
        const {uploadSuccess, beforeIconChange, hiddenActivityIndicator} = this.props;
        const options = {
            baseUrl: `${baseURL + userAvatar}`,
            accept: 'image/*',
            dataType: 'json',
            fileFieldName: 'photo',
            chooseFile: function(files) {
                beforeIconChange();
                doUserAvatarUpload(userAvatar, {}, {
                    photo: files[0]
                }, true).then((res) => {
                    this.refs.ajax_upload_file_input.value = "";
                    hiddenActivityIndicator();
                    if (res.path) {
                        uploadSuccess(res.path);
                        Toast.success("上传成功", 2)
                    } else
                        Toast.fail('上传失败，请稍后再试', 2);
                })
            }
        }
        return (
            <div>
              <List className={ `${PrefixCls}-list` } ref="chooseBtn">
                <Item>
                  <div className={ `${PrefixCls}-user-icon-upload` }>
                    <FileUpload options={ options }>
                      <p className={ "icon-title-avatar" } ref="chooseBtn">
                        <span>更换头像</span>
                      </p>
                      <div className={ "icon-img-box" }>
                        <img src={ getUserAvatar(userPic) } alt="icon" onError={getUserAvatarError}/>
                      </div>
                    </FileUpload>
                  </div>
                </Item>
                <Item extra={ userName }>
                  姓名
                </Item>
                <Item wrap extra={ depts }>
                  所属部门
                </Item>
                <Item extra={ integral }>
                  积分
                </Item>
                <Item extra={ grade }>
                  身份
                </Item>
                <Item extra={ roles } wrap>
                  角色
                </Item>
                <Item extra={ emails }>
                  邮件
                </Item>
                <Item arrow="horizontal" onClick={ this.handleChange.bind(this) }>
                  字体大小
                </Item>
              </List>
              <ActivityIndicator animating={ this.props.animating } toast text="上传中..." />
            </div>
        )
    }

}

export default Sets;
