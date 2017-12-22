import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { ListView } from 'antd-mobile';
import { querysearchatt, querysearchlist } from 'services/querys'

//选择器配置
const defaultFilterProps = {
        isShow: false,
        currentKey: "",
        currentValue: {},
        currentItems: [],
        refs: {},
    },
    defaultResultProps = {
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
    } , defalutClientHeight = document.documentElement.clientHeight;

export default modelExtend(pageModel, {
    namespace: 'search',

    state: {
        //初始参数
        modules: [],
        moduleMenu: {},
        currentModuleId: "4",
        currentFilter: {},
        defalutHeight : defalutClientHeight,

        isSearch: false,
        textQuery: "",
        resultProps: Object.assign({}, defaultResultProps),
        filterProps: Object.assign({}, defaultFilterProps)
    },
    subscriptions: {
        setup({dispatch, history}) {
            history.listen(({pathname, query, action}) => {
                if (pathname === '/search') {
                    if (action == "PUSH") {
                        dispatch({ //重置默认搜索参数
                            type: "updateState",
                            payload: {
                                isSearch: false,
                                textQuery: "",
                                currentParams: {},
                                resultProps: Object.assign({}, defaultResultProps),
                                filterProps: Object.assign({}, defaultFilterProps)
                            }
                        })
                        dispatch({ //查询可选参数项
                            type: 'query',
                        })
                    }
                }
            })
        },
    },
    effects: {
        * query({payload, }, {call, put, select}) {
            const data = yield call(querysearchatt);
            if (data) {
                yield put({
                    type: 'updateState',
                    payload: {
                        currentParams: {},
                        ...data,
                    },
                })
            }
        },
        * search({payload}, {call, put, select}) {
            const data = yield call(querysearchlist, payload);
            if (data) {
                let {resultProps : {currentData, pageIndex, hasMore, dataSource}} = yield select(state => state.search);
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
        * resetSearch({payload}, {call, put, select}) {
            yield put({
                type: 'resetResult'
            });
            yield put({
                type: 'search'
            });
        },
    },
    reducers: {
        updateFilter(state, {payload}) {
            const {filterProps} = state;
            return {
                ...state,
                filterProps: {
                    ...filterProps,
                    ...payload
                }
            }
        },
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
        updateUser(state, {payload = {}}) {
            const {filterProps = {}} = state,
                {currentValue = {}} = filterProps;
            return {
                ...state,
                filterProps: {
                    ...filterProps,
                    currentValue: {
                        ...currentValue,
                        ...payload
                    }
                }
            }
        },
    }
})