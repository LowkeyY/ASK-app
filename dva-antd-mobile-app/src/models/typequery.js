/* global window */
import modelExtend from 'dva-model-extend'
import { parse } from 'qs'
import { pageModel } from './common'
import { query } from 'services/typequery'
import { isEmptyObject } from 'utils'

const primaryTag = "moduleId",
    defaultSelectedKey = "4",
    getDefaultSelected = (moduleMenu, primaryTag) => { //保存默认查询属性，每个条件组中第一个条件的值
        const result = {};
        Object.keys(moduleMenu).map(_ => {
            let selected = {};
            moduleMenu[_].map(menu => {
                selected[menu["key"]] = menu.items[0].value
            })
            selected[primaryTag] = _;
            result[_] = selected;
        })
        return result;
    },
    getFilterSelectedByModulesId = (filterSelected, defaultSelected, defaultSelectedKey) => {
        if (!filterSelected || isEmptyObject(filterSelected)) //返回默认查询参数
            return defaultSelected[defaultSelectedKey];
        const defaultModuleSelected = defaultSelected[filterSelected[primaryTag]];
        return {
            ...defaultModuleSelected,
            ...filterSelected
        }
    };

export default modelExtend(pageModel, {
    namespace: 'typequery',
    state: {
        primaryTag,
        defaultSelectedKey,
        defaultSelected: {},
        filterSelected: {},
        modules: [],
        moduleMenu: {},
        menuOpened: false,
        preFilterSelected: {},
        refreshing: true,
    },

    subscriptions: {
        setup({dispatch, history}) {
            dispatch({
                type: 'query',
            })
            history.listen(({pathname, query, action}) => {
                if (pathname === '/typequery') {
                    if (action === "PUSH") {
                        if (query && !isEmptyObject(query)) {
                            dispatch({
                                type: 'update',
                                payload: query
                            })
                        }
                        dispatch({
                            type: 'query',
                        })
                    }
                }
            })
        },
    },

    effects: {
        * query({payload, }, {call, put, select}) {
            const data = yield call(query);
            if (data) {
                let {filterSelected, defaultSelectedKey, primaryTag} = yield select(state => state.typequery);
                const defaultSelected = getDefaultSelected(data.moduleMenu, primaryTag);
                filterSelected = getFilterSelectedByModulesId(filterSelected, defaultSelected, defaultSelectedKey);
                yield put({
                    type: 'updateState',
                    payload: {
                        ...data,
                        defaultSelected,
                        filterSelected
                    },
                })
            }
        }
    },
    reducers: {
        update(state, {payload}) {
            let {filterSelected} = state;
            filterSelected = {
                ...filterSelected,
                ...payload
            }
            return {
                ...state,
                filterSelected
            }
        },
    }
})