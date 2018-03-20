import { routerRedux } from 'dva/router'
import { login } from 'services/login'

import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { setLoginIn } from 'utils'

export default modelExtend(pageModel, {
    namespace: 'login',

    state: true,


    effects: {
        * login({payload}, {call, put, select}) {
            const {from = "/", ...params} = payload;
            const data = yield call(login, params);
            if (data) {
                setLoginIn({
                    ...data,
                    ...params
                });
                yield put(routerRedux.push({
                    pathname: from
                }))
            }
        },
    },
    reducers: {
        'disabled'(state) {
            return state = !state;
        }
    }
})
