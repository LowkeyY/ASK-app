/* global window */
/* global document */
/* global location */
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import config from 'config'
import { user, userDatas, logout } from 'services/app'
import { setLoginOut } from 'utils'
import { Toast } from 'antd-mobile';

const {prefix} = config;
const defalutHeight=document.documentElement.clientHeight
export default {
    namespace: 'app',
    state: {
        user: {},
        userData: {},
        isLayout: false,
        defalutHeight
    },
    subscriptions: {
        setup({dispatch, history}) {
            const {pathname} = location;
            if (!pathname.startsWith('/login')) {
                dispatch({
                    type: 'query'
                })
                dispatch({
                    type: 'typequery/query'
                })
            }
        },
    },
    effects: {
        * query({payload}, {call, put, select}) {
            const data = yield call(user, payload)
            if (data) {
                yield put({
                    type: 'updateState',
                    payload: data,
                })
            }
        },
        * logout({}, {call, put, select}) {
            yield put({
                type: 'updateState',
                payload: {
                    isLayout: true
                },
            })
            const data = yield call(logout);
            if (data) {
                setLoginOut();
                yield put(routerRedux.replace({
                    pathname: "/login"
                }))
            }
        },
        * userData({payload}, {call, put, select}) {
            const data = yield call(userDatas, {
                opts: "userdata",
                optId: payload.value
            })
            if (data) {
                const {user, userData} = yield select(_ => _.app);
                yield put({
                    type: 'updateState',
                    payload: {
                        ...user,
                        userData: {
                            ...userData,
                            pageFontsize: payload.value
                        }
                    },
                })
                yield put(routerRedux.go(-2));
                Toast.success('修改成功', 1);
            } else {
                Toast.fail('修改失败请重试', 1);
            }
        }

    },
    reducers: {
        updateState(state, {payload}) {
            return {
                ...state,
                ...payload,
            }
        },
    },
}
