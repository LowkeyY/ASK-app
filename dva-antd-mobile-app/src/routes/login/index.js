// import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'dva';
// import { routerRedux } from 'dva/router';
// import { InputItem, WhiteSpace,WingBlank,Button,Checkbox, Flex } from 'antd-mobile';
// import { config } from 'utils';
// import styles from './index.less';
// import user from '../../themes/images/用户名.png'
// import pwd from '../../themes/images/密码.png'
// import img from '../../themes/images/logo3.png'
// const PrefixCls="login";
// const AgreeItem = Checkbox.AgreeItem;
// const Login = ({dispatch,login}) => {
//
//   const handleLogin = () =>{
//     dispatch(routerRedux.push({pathname:"/"}))
//   };
//   const handleDisabled =()=>{
//     dispatch({
//       type:'login/disabled'
//     });
//
//     return login
//   };
//   return (
//
//   <div className={styles[`${PrefixCls}-container`]}>
//     <div className={styles[`${PrefixCls}-logobox`]}>
//       <img src={img} alt=""/>
//     </div>
//     <div className={styles[`${PrefixCls}-form`]}>
//       <WingBlank size="lg">
//         <InputItem
//           placeholder="用户名"
//         ><div style={{ backgroundImage: 'url('+user+')', backgroundSize: 'cover', height: '22px', width: '22px' }} />
//         </InputItem>
//       </WingBlank>
//       <WingBlank size="lg">
//         <InputItem
//           type="password"
//           placeholder="密码"
//         ><div style={{ backgroundImage: 'url('+pwd+')', backgroundSize: 'cover', height: '22px', width: '22px' }} />
//         </InputItem>
//         <WhiteSpace size="lg"/>
//         <div className={styles[`${PrefixCls}-check`]}>
//           <Flex>
//             <Flex.Item>
//               <AgreeItem data-seed="logId" onChange={handleDisabled}>
//                 <span onClick={(e) =>{ e.preventDefault(); }}><span className={styles[`${PrefixCls}-agreement`]}><span>我已阅读并同意</span><a href="#">《隐私协议》</a></span></span>
//               </AgreeItem>
//             </Flex.Item>
//           </Flex>
//         </div>
//         <WhiteSpace size="lg"/>
//         <WhiteSpace size="lg"/>
//       </WingBlank>
//       <WingBlank size="lg"><Button type="primary"
//                                    disabled={login}
//                                    onClick={handleLogin.bind(null)}>登录</Button> </WingBlank>
//     </div>
//   </div>
//
//   )
// };
//
//
// export default connect(({login})=>({login}))(Login)




import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { InputItem, WhiteSpace,WingBlank,Button,Checkbox, Flex } from 'antd-mobile';
import { config } from 'utils';
import styles from './index.less';
import user from '../../themes/images/头像.png'
import pwd from '../../themes/images/锁.png'
import img from '../../themes/images/logon9.png'
const PrefixCls="login";
const AgreeItem = Checkbox.AgreeItem;
const Login = ({dispatch,login}) => {

  const handleLogin = () =>{
    dispatch(routerRedux.push({pathname:"/"}))
  };
  const handleDisabled =()=>{
    dispatch({
      type:'login/disabled'
    });
    return login
  };
  return (
    <div className={styles[`${PrefixCls}-container`]}>
      <div className={styles[`${PrefixCls}-logobox`]}>
        <img src={img} alt=""/>
      </div>
      <div className={styles[`${PrefixCls}-form`]}>
        <WingBlank size="lg">
          <InputItem
            placeholder="用户名"
          ><div style={{ backgroundImage: 'url('+user+')', backgroundSize: 'cover', height: '22px', width: '22px' }} />
          </InputItem>
        </WingBlank>
        <WingBlank size="lg">
          <InputItem
            type="password"
            placeholder="密码"
          ><div style={{ backgroundImage: 'url('+pwd+')', backgroundSize: 'cover', height: '22px', width: '22px' }} />
          </InputItem>
          <WhiteSpace size="lg"/>
          <div className={styles[`${PrefixCls}-check`]}>
            <Flex>
              <Flex.Item>
                <AgreeItem data-seed="logId"  onChange={handleDisabled}>
                  <span onClick={(e) =>{ e.preventDefault(); }}><span className={styles[`${PrefixCls}-agreement`]}><span >我已阅读并同意</span><a className={styles[`${PrefixCls}-agreement-text`]} href="#">《隐私协议》</a></span></span>
                </AgreeItem>
              </Flex.Item>
            </Flex>
          </div>
          <WhiteSpace size="lg"/>
          <WhiteSpace size="lg"/>
        </WingBlank>
        <WingBlank size="lg"><Button  type="ghost"
                                      disabled={login}
                                      onClick={handleLogin.bind(null)}>登录</Button> </WingBlank>
      </div>
    </div>

  )
};


export default connect(({login})=>({login}))(Login)
