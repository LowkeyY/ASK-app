import { routerRedux } from 'dva/router'
import { login } from 'services/login'
import { Toast } from 'antd-mobile'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { setLoginIn } from 'utils'

export default modelExtend(pageModel, {
    namespace: 'login',

    state: {
        state: true,
        isLogin: true
    },

    effects: {
        * login({payload}, {call, put, select}) {
            yield put({
                type: 'updateState',
                payload: {
                    isLogin: false
                }
            })
            const {from = "/", ...params} = payload;
            const data = yield call(login, params, true);

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
                yield put(routerRedux.push({
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
