import { routerRedux } from 'dva/router'
import { login } from 'services/login'
import { Toast } from 'antd-mobile'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { setLoginIn } from 'utils'

const CryptoJS = require("crypto-js") , encrypt = (word) => {
  var key = CryptoJS.enc.Utf8.parse("nuctech1-Aakapp9");
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
  return encrypted.toString();
}

export default modelExtend(pageModel, {
    namespace: 'login',

    state: {
        state: true,
        isLogin: true,
        loadPwd:''
    },

    effects: {
        * login({payload}, {call, put, select}) {
            yield put({
                type: 'updateState',
                payload: {
                    isLogin: false
                }
            })
            const {from = "/", ...params} = payload , {user_power = ""} = params;
            const data = yield call(login, Object.assign({}, params, {user_power : encrypt(user_power)}) , true);

            if (data && data.success !== false) {
                yield put({
                    type: 'updateState',
                    payload: {
                        isLogin: true
                    }
                })
                yield put({
                    type: 'app/updateState',
                    payload: {
                        isLayout: false
                    }
                })
                setLoginIn({
                    ...data,
                    ...params
                });
                yield put(routerRedux.replace({
                    pathname: from
                }))
            }
            if (data.success === false) {
                Toast.offline(data.message)
                yield put({
                    type: 'updateState',
                    payload: {
                        isLogin: true
                    }
                })
            }
        },
    },
    reducers: {
        'disabled'(state) {
            return state = !state;
        }
    }
})
