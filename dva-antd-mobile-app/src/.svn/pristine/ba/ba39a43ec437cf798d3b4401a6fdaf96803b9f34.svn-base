
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { getContent, getCommends } from 'services/querycontent'
const findChildrenById = (items = [], id, result = []) => {
        if (items && items.length)
            items.map(item => {
                if (item.id === id)
                    result.push(item);
                findChildrenById(item.items, id, result);
            })
    },
    findAllDeleteId = (items = [], result = []) => {
        if (items && items.length)
            items.map(item => {
                result.push(item.id);
                findAllDeleteId(item.items, result);
            })
    },
    deleteItemsById = (items, deleteId) => {
        let currentItmes = [];
        if (items && items.length) {
            items.map((item, index) => {
                if (item.id !== deleteId) {
                    currentItmes.push(item);
                    if (item.items && item.items.length)
                        item.items = deleteItemsById(item.items, deleteId);
                }
            })
        }
        return currentItmes;
    };


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
                        currentComments: resule.data,
                    },
                })
            }
        },
        * deleteCommends({payload}, {call, put, select}) {
            const {currentComments} = yield select(_ => _.details);
            const {id} = payload;
            let results = [],
                deleteIds = [];
            findChildrenById(currentComments, id, results);
            results = results[0];
            deleteIds.push(results.id);
            console.log(results);
            findAllDeleteId(results.items, deleteIds);
            console.log(deleteIds);
            results = deleteItemsById(currentComments, id);
            yield put({
                type: 'updateState',
                payload: {
                    currentComments: results,
                },
            })
        }
    },
})

