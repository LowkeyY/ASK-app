/* global window */
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { ListView } from 'antd-mobile';
import { getLists } from 'services/querylist'
const  defalutClientHeight = document.documentElement.clientHeight;
export default modelExtend(pageModel, {
  namespace:'hotwordsresult',
  state: {
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
    currentData: [],
    refreshing: false,
    isLoading: false,
    hasMore: true,
    pageIndex: 0,
    totalCount: 0,
    scrollerTop: 0,
    pagination: {
      0: 0
    },
    defalutHeight: defalutClientHeight
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        let {pathname, query} = location;
        if (pathname.startsWith('/hotwordsresult')) {

        }
      })
    }
  },
  effects: {
    * query({payload}, {call, put, select}) {
      const data = yield call(getLists, payload);
      if (data) {
        let {currentData,pageIndex, hasMore,dataSource,totalCount,isLoading,pagination} = yield select(state => state.hotwordsresult);
        currentData = [...currentData, ...data.data];
        dataSource = dataSource.cloneWithRows(currentData);
        pageIndex = pageIndex + 1;
        hasMore = currentData.length < data.totalNumber;
        yield put({
          type: 'updateData',
          payload: {
            currentData,
            totalCount: data.totalNumber,
            hasMore: hasMore,
            pageIndex: pageIndex,
            dataSource
          },
        })
      }
    },
  },
  reducers: {
    updateData(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },
  },
})
