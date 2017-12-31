/* global window */
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'

export default modelExtend(pageModel, {
    namespace: 'mine',
    state: {
        currentItem: {},
        modalVisible: false,
        modalType: 'create',
        selectedRowKeys: [],
    },
    subscriptions: {
        setup({dispatch, history}) {
            dispatch({
                type: 'query'
            })
            history.listen(location => {
                let {pathname, query} = location;
                if (pathname.startsWith('/mine')) {
                    dispatch({
                        type: 'app/query'
                    })
                }
            })
        },
    },
    effects: {
        * updateData({payload, }, {call, put, select}) {
            const result = yield call(updateUserData, payload);
            if (result) {
                const {data, is404 = false} = result;
                yield put({
                    type: 'updateState',
                    payload: {
                        currentContent: {
                            ...result.data
                        },
                        is404
                    },
                })
            }
        },
    }
})