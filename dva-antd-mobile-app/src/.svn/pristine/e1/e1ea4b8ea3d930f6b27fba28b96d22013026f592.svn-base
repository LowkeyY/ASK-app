/* global window */
import modelExtend from 'dva-model-extend'
import { ListView } from 'antd-mobile';
import { pageModel } from './common'
import { getLists } from 'services/querylist'


export default modelExtend(pageModel, {
    namespace: 'querylist',
    state: {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        currentData: [],
        isLoading: false,
        hasMore: true,
        pageIndex: 0,
        totalCount: 0,
        scrollerTop: 0,
    },
    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                let {pathname, query} = location;
                if (pathname.startsWith('/querylist')) {
                    dispatch({
                        type: 'updateQuery',
                        payload: {
                            ...query
                        }
                    })
                }
            })
        }
    },
    effects: {
        * updateQuery({payload}, {call, put}) {
            yield put({
                type: 'updateState',
                payload
            })
        },
        * query({payload}, {call, put, select}) {
            const data = yield call(getLists, payload);
            //关闭分类检索页面刷新。
            yield put({
                type: 'typequery/updateState',
                payload: {
                    refreshing: false,
                }
            });
            if (data) {
                let {currentData, pageIndex, hasMore} = yield select(state => state.querylist);
                currentData = [...currentData, ...data.data];
                pageIndex = pageIndex + 1;
                hasMore = currentData.length < data.totalNumber;
                yield put({
                    type: 'updateData',
                    payload: {
                        currentData: currentData,
                        totalCount: data.totalNumber,
                        isLoading: false,
                        hasMore: hasMore,
                        pageIndex: pageIndex
                    },
                })
            }
        },
    },
    reducers: {
        resetState(state, {payload}) {
            return {
                dataSource: new ListView.DataSource({
                    rowHasChanged: (row1, row2) => row1 !== row2,
                }),
                currentData: [],
                isLoading: false,
                hasMore: true,
                pageIndex: 0,
                totalCount: 0,
                scrollerTop: -1,
            }
        },
        updateData(state, {payload}) {
            const {currentData} = payload;
            if (currentData) {
                let {dataSource} = state;
                dataSource = dataSource.cloneWithRows(currentData);
                payload = {
                    ...payload,
                    dataSource
                };
            }
            return {
                ...state,
                ...payload
            }
        },
    },
})
