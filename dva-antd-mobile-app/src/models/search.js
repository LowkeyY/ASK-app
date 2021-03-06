import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { ListView } from 'antd-mobile'
import { querysearchatt, querysearchlist, userDatas } from 'services/querys'

//选择器配置
const defaultFilterProps = {
    isShow: false,
    defaultFocus: true,
    currentKey: '',
    currentValue: {},
    currentItems: [],
    startDate: null,
    endDate: null,
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
    pagination: {
      0: 0,
    },
  },
  defalutClientHeight = document.documentElement.clientHeight,
  cloneObj = (obj) => JSON.parse(JSON.stringify(obj))

export default modelExtend(pageModel, {
  namespace: 'search',

  state: {
    //初始参数
    modules: [],
    moduleMenu: {},
    currentModuleId: '4',
    currentFilter: {},
    defalutHeight: defalutClientHeight,
    isSearch: false,
    textQuery: '',
    //记录每次查询参数 ， object.assign 只是浅拷贝
    // resultProps: Object.assign({}, defaultResultProps),
    // filterProps: Object.assign({}, defaultFilterProps)
    //每次都重置查询参数
    resultProps: cloneObj(defaultResultProps),
    filterProps: cloneObj(defaultFilterProps),
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/search') {
          if (action == 'PUSH') {
            dispatch({ //重置默认搜索参数
              type: 'updateState',
              payload: {
                isSearch: false,
                textQuery: '',
                defaultHasFocus: true,
                currentModuleId: '4', //默认搜索模块
                currentFilter: {},
                resultProps: cloneObj(defaultResultProps),
                filterProps: cloneObj(defaultFilterProps),
              },
            })
            dispatch({ //查询可选参数项
              type: 'query',
            })
          } else {
            //关闭选项卡
            dispatch({
              type: 'updateFilter',
              payload: {
                isShow: false,
              },
            })
          }
        }
      })
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const data = yield call(querysearchatt)
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
    * search ({ payload }, { call, put, select }) {
      const data = yield call(querysearchlist, payload)
      if (data) {
        let { resultProps: { currentData, pageIndex, hasMore, dataSource } } = yield select(state => state.search)
        if (payload.start === 0) {//iOS 触发多次 刷新
          if (currentData.length == 0 || currentData.length != data.data.length) {
            currentData = [...data.data]
            pageIndex = 1
          }
        } else {
          currentData = [...currentData, ...data.data]
          pageIndex = pageIndex + 1
        }
        dataSource = dataSource.cloneWithRows(currentData)
        hasMore = currentData.length < data.totalNumber
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
    * resetSearch ({ payload }, { call, put, select }) {
      yield put({
        type: 'resetResult',
      })
      yield put({
        type: 'search',
      })
    },
    * collect ({ payload }, { call, put, select }) {
      const { id, value } = payload
      const data = yield call(userDatas, {
        opts: 'collect',
        optId: id,
        types: value,
      })
      if (data) {
        yield put({
          type: 'updateItemState',
          payload: {
            itemId: id,
            itemValue: {
              isCollect: value === 1,
            },
          },
        })
      }
    },
  },
  reducers: {
    updateFilter (state, { payload }) {

      const { filterProps } = state,
        others = {},
        { isShow = null } = payload
      if (isShow != null) {
        others.defaultFocus = !isShow
      }
      return {
        ...state,
        filterProps: {
          ...filterProps,
          ...others,
          ...payload,
        },
      }
    },
    updateResult (state, { payload }) {
      const { resultProps } = state
      return {
        ...state,
        resultProps: {
          ...resultProps,
          ...payload,
        },
      }
    },
    resetResult (state, { payload }) {
      return {
        ...state,
        resultProps: {
          ...Object.assign({}, defaultResultProps),
          ...payload,
        },
      }
    },
    updateUser (state, { payload = {} }) {
      const { filterProps = {}, currentFilter = {} } = state,
        { currentValue = {} } = filterProps
      return {
        ...state,
        currentFilter: {
          ...currentFilter,
          ...payload,
        },
        filterProps: {
          ...filterProps,
          currentValue: {
            ...currentValue,
            ...payload,
          },
        },
      }
    },
    updateItemState (state, { payload }) {
      const { itemId = '', itemValue = {} } = payload,
        { resultProps } = state
      let { currentData, dataSource } = resultProps
      if (itemId && currentData.length) {
        currentData = currentData.map(item => {
          if (item.id === itemId) {
            item = {
              ...item,
              ...itemValue,
            }
          }
          return item
        })
        dataSource = dataSource.cloneWithRows(currentData)
      }
      return {
        ...state,
        resultProps: {
          ...resultProps,
          currentData,
          dataSource,
        },
      }
    },
    deleteItemById (state, { payload }) {
      const { itemId = '' } = payload,
        { resultProps } = state,
        newData = []
      let { currentData = [], dataSource } = resultProps
      if (itemId && currentData.length) {
        currentData.map(item => {
          if (item.id != itemId) {
            newData.push(item)
          }
        })
        dataSource = dataSource.cloneWithRows(newData)
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
  }
})
