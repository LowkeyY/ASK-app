/* global window */
import modelExtend from 'dva-model-extend';
import { pageModel } from './common';
import { ListView } from 'antd-mobile';
import { mylist } from 'services/querys';
import { getContent } from 'services/querycontent';
import { userDatas } from 'services/app';
//默认查询结果参数
const defaultResultProps = {
        refreshing: false,
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        currentData: [],
        isLoading: false,
        hasMore: true,
        pageIndex: 0,
        totalCount: 0,
        scrollerTop: 0,
        pagination: {
            0: 0
        },
    },
    defalutClientHeight = document.documentElement.clientHeight;

export default modelExtend(pageModel, {
    namespace: 'mylist',

    state: {
        currentType: 0,
        currentTitle: "",
        others: {},
        defalutHeight: defalutClientHeight,
        resultProps: Object.assign({}, defaultResultProps)
    },

    subscriptions: {
        setup({dispatch, history}) {
            history.listen(({pathname, query, action}) => {
                if (pathname === '/mylist') {
                    window.cnClearBadge();
                    if (action == "PUSH" || (action == "POP" && query.types == "1")) {
                        //type 表示访问类型 我的消息列表、我的收藏案例等， types 表示 新消息、发布的与回复的区分
                        const {type = 0, title = "", ...others} = query;
                        dispatch({ //重置默认搜索结果
                            type: "updateState",
                            payload: {
                                currentType: type,
                                currentTitle: title,
                                others: Object.assign({}, others),
                                resultProps: Object.assign({}, defaultResultProps)
                            }
                        })
                        dispatch({ //默认开启查询
                            type: 'query',
                            payload: {
                                start: 0
                            }
                        })
                    }
                }
            })
        },
    },
    effects: {
        * query({payload}, {call, put, select}) {
            const {resultProps : {pageIndex}, currentType, others} = yield select(state => state.mylist);
            const data = yield call(mylist, {
                moduleId: currentType,
                start: pageIndex,
                ...others,
                ...payload
            });
            if (data) {

                let {resultProps : {currentData, pageIndex, hasMore, dataSource}} = yield select(state => state.mylist);
                currentData = [...currentData, ...data.data];
                pageIndex = pageIndex + 1;
                dataSource = dataSource.cloneWithRows(currentData);
                hasMore = currentData.length < data.totalNumber;
                yield put({
                    type: 'updateResult',
                    payload: {
                        currentData: currentData,
                        totalCount: data.totalNumber,
                        dataSource: dataSource,
                        hasMore: hasMore,
                        pageIndex: pageIndex,
                        isLoading: false,
                        refreshing: false,
                    },
                })
            }
        },
        *collect({payload}, {call, put, select}) {
            const {id, value} = payload;
            const data = yield call(userDatas, {
                opts: "collect",
                optId: id,
                types: value
            })
            if (data) {
                yield put({
                    type: 'updateItemState',
                    payload: {
                        itemId: id,
                        itemValue: {
                            isCollect: value === 1
                        }
                    },
                })
            }
        },
        *changeStatus({payload}, {call, put, select}) {
            const {updateId} = payload;
            const result = yield call(getContent, {
                updateId,
                id: -1,
                moduleId: -1,
            });
            if (result) {
                yield put({
                    type: 'updateItemState',
                    payload: {
                        updateId
                    },
                })
            }
        }
    },
    reducers: {
        updateResult(state, {payload}) {
            const {resultProps} = state;
            return {
                ...state,
                resultProps: {
                    ...resultProps,
                    ...payload
                }
            }
        },
        resetResult(state, {payload}) {
            return {
                ...state,
                resultProps: {
                    ...Object.assign({}, defaultResultProps),
                    ...payload
                }
            }
        },
        updateItemState(state, {payload}) {
            const {itemId = "", itemValue = {}, updateId = ""} = payload,
                {resultProps} = state;

            let {currentData, dataSource} = resultProps;
            if (updateId && currentData.length) {
                currentData = currentData.map(item => {
                    if (item.id === updateId)
                        item = {
                            ...item,
                            flag: "1"
                        };
                    return item;
                });
                dataSource = dataSource.cloneWithRows(currentData);
            }
            return {
                ...state,
                resultProps: {
                    ...resultProps,
                    currentData,
                    dataSource
                }
            }
        },
        deleteItemById(state, {payload}) {
            const {itemId = ""} = payload,
                {resultProps} = state,
                newData = [];
            let {currentData = [], dataSource} = resultProps;
            if (itemId && currentData.length) {
                currentData.map(item => {
                    if (item.id != itemId)
                        newData.push(item)
                });
                dataSource = dataSource.cloneWithRows(newData);
            }
            return {
                ...state,
                resultProps: {
                    ...resultProps,
                    currentData: newData,
                    dataSource
                }
            }
        },
        removeNotCollection(state, {payload}) {
            const {itemId = ""} = payload,
                {resultProps} = state
            let {currentData = [], dataSource} = resultProps;
            if (itemId && currentData.length) {
                currentData = currentData.filter(item => item.id !== itemId)
                dataSource = dataSource.cloneWithRows(currentData);
            }
            return {
                ...state,
                resultProps: {
                    ...resultProps,
                    currentData: currentData,
                    dataSource
                }
            }
        }
    }
})

