/* global window */
/* global document */
/* global location */
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import config from 'config'
import { user } from 'services/app'

const {prefix} = config;

export default {
    namespace: 'app',
    state: {
        user: {},
        pageFontsize: "normal",
        isShowEditor:false,
        isShowInputFoot:true
    },
    subscriptions: {
        setup({dispatch, history}) {
            dispatch({
                type: 'query'
            })
            dispatch({
                type: 'typequery/query'
            })
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
