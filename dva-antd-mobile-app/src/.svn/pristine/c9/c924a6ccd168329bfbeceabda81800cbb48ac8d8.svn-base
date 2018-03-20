/* global window */
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { queryusers } from 'services/app'

export default modelExtend(pageModel, {
    namespace: 'searchuser',
    state: {
        queryusers: [],
        selectedUsers: [],
        selectedUserValues: [],
        tragetState: "",
        tragetStateKey: "",
        selectedIndex: 1,
        textQuery:'',
        isSingle: true
    },
    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                let {pathname, query = {}} = location;
                if (pathname.startsWith('/searchuser')) {
                    const {tragetState = "", isSingle = "", tragetStateKey = "",textQuery='',queryusers=[]} = query;
                    dispatch({
                        type: 'updateState',
                        payload: {
                            tragetState,
                            textQuery,
                            queryusers,
                            isSingle: isSingle == "true",
                            tragetStateKey
                        }
                    })
                }
            })
        }
    },
    effects: {
        * query({payload, }, {call, put, select}) {
            const data = yield call(queryusers, payload);
            if (data) {
                yield put({
                    type: 'updateState',
                    payload: {
                        queryusers: data.users,
                    },
                })
            }
        },
    },
})
