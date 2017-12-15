
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { getContent, getCommends } from 'services/querycontent'
export default modelExtend(pageModel, {
    namespace: 'details',
    state: {
        currentContent: {},
        currentComments: [],
        isShowEditor:false,
        isShowInputFoot:true,
        placeholder:'请输入内容...'
    },
    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                let {pathname, query} = location;
                if (pathname.startsWith('/details')) {
                    dispatch({
                        type: 'updateState',
                        payload: {
                            ...query
                        }
                    })
                    dispatch({
                        type: 'queryContent',
                        payload: {
                            ...query
                        }
                    })
                    dispatch({
                        type: 'queryCommends',
                        payload: {
                            ...query
                        }
                    })
                }
            })
        }
    },
    effects: {
        * queryContent({payload, }, {call, put, select}) {
            const resule = yield call(getContent, payload);
            if (resule) {
                yield put({
                    type: 'updateState',
                    payload: {
                        currentContent: {
                            ...resule.data
                        },
                    },
                })
            }
        },
        * queryCommends({payload, }, {call, put, select}) {
            const resule = yield call(getCommends, payload);
            if (resule) {
                yield put({
                    type: 'updateState',
                    payload: {
                        currentComments: resule.data
                        ,
                    },
                })
            }
        }
    },
})

