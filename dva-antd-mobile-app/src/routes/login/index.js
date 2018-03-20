import React from 'react';
import PropTypes from 'prop-types';
import {createForm} from 'rc-form';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {InputItem, WhiteSpace, WingBlank, Button, Checkbox, Flex, Toast,ActivityIndicator } from 'antd-mobile';
import {config} from 'utils';
import {_cg} from 'utils/cookie';
import styles from './index.less';
import user from '../../themes/images/头像.png'
import pwd from '../../themes/images/锁.png'
import img from '../../themes/images/loginicon.png'
import bg from '../../themes/images/loginbg.png'
const PrefixCls = "login";
const AgreeItem = Checkbox.AgreeItem;

class Login extends React.Component {
  // const handleLogin = () =>{
  //   dispatch(routerRedux.push({pathname:"/"}))
  // };
  // const handleDisabled =()=>{
  //   dispatch({
  //     type:'login/disabled'
  //   });
  //   return login
  // };
  constructor(props) {
    super()
    this.state = {
      isAgreement: true,
    }

  }

  handleDisabled() {
    this.setState({
      isAgreement: !this.state.isAgreement
    })
  }

  onSubmit = () => {
    this.props.form.validateFields({
      force: true
    }, (error) => {
      if (!error) {
        this.props.dispatch({
          type: 'login/login',
          payload:{
            ... this.props.form.getFieldsValue(),
          }
        })
      } else {
        Toast.fail("请确认信息是否正确", 3);
      }
    });
  }
  setPwdValue=(e)=>{

  }
  moveInput = () => {//解决android键盘挡住input
    this.refs.span.scrollIntoView(true)
  }

  render() {
    const {getFieldProps, getFieldError} = this.props.form,
      userKey = "user_name",
      powerKey = "user_power";
    return (
      <div className={styles[`${PrefixCls}-container`]} style={{backgroundImage:"url("+bg+")"}}>
        <div className={styles[`${PrefixCls}-logobox`]}>
          <img src={img} alt=""/>
        </div>
        <div className={styles[`${PrefixCls}-form`]}>
          <form ref="form">
            <WingBlank size="lg">
              <InputItem placeholder="用户名"
                         onFocus={this.moveInput.bind(this)}
                         {...getFieldProps(userKey, {
                initialValue: _cg(userKey), rules: [{required: true, message: '用户名必须输入'}, {
                  min: 2, message:
                    '用户名小于2个字符'
                }]
              })} clear error={!!getFieldError(userKey)} onErrorClick={() => {
                Toast.fail(getFieldError(userKey));
              }}>
                <div style={{
                  backgroundImage: 'url(' + user + ')',
                  backgroundSize: 'cover',
                  height: '22px',
                  width: '22px'
                }}/>
              </InputItem>
            </WingBlank>
            <WingBlank size="lg">
              <InputItem
                onKeyUp={this.setPwdValue.bind(null)}
                type="password"
                placeholder="密码"
                onFocus={this.moveInput.bind(this)}
                {...getFieldProps(powerKey, {
                  initialValue: _cg(powerKey), rules: [{required: true, message: '密码必须输入'}, {
                    min: 1, message:
                      '密码小于1个字符'
                  }]
                })}
                clear
                error={!!getFieldError(powerKey)}
                onErrorClick={() => {
                  Toast.fail(getFieldError(powerKey));
                }}>
                <div style={{
                  backgroundImage: 'url(' + pwd + ')',
                  backgroundSize: 'cover',
                  height: '22px',
                  width: '22px'
                }}/>
              </InputItem>
              <WhiteSpace size="sm"/>
              <div className={styles[`${PrefixCls}-check`]}>
                <Flex>
                  <Flex.Item>
                    <AgreeItem data-seed="logId" onChange={this.handleDisabled.bind(this)}>
                            <span onClick={(e) => {
                              // e.preventDefault();
                            }}><span ref="span" className={styles[`${PrefixCls}-agreement`]}><span>我已阅读并同意</span></span>
                            </span>
                      <span className={styles[`${PrefixCls}-agreement-text`]}>《隐私协议》</span>
                    </AgreeItem>
                  </Flex.Item>
                </Flex>
              </div>
              <WhiteSpace size="sm"/>
            </WingBlank>
            <WingBlank size="lg">
              {
                this.props.login.isLogin?(
                  <Button   type="ghost" className="am-button-borderfix" disabled={this.state.isAgreement}
                            onClick={this.onSubmit.bind(this)}>
                    登录
                  </Button>
                ):<Button  loading type="ghost" className="am-button-borderfix" disabled={true}>
                  登录
                </Button>
              }
            </WingBlank>
          </form>
        </div>
      </div>
    )
  }
}
;


export default connect(({login, loading}) => ({
  login,
  loading
}))(createForm()(Login));
