import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { query } from 'services/dashboard'
import { model } from 'models/common'
import { ListView } from 'antd-mobile';

const checkItemsIcon = (item) => {
    if (Array.isArray(item))
        item.length && item.map(_ => {
            _.icon === "" && (_.icon = getGridDefualtIcon(_.text))
        });
}
const getGridDefualtIcon = (text) => require(`themes/images/${text}.png`),
      defalutHeight=document.documentElement.clientHeight;

export default modelExtend(model, {
    namespace: 'dashboard',
    state: {
        hasNews: false,
        isModalShow: false,
        hotWordModuleId: "5",
        noteModuleId: "6",
        defalutHeight: defalutHeight,
        modules: [
            {
                id: 4,
                text: "交流论坛",
                icon: require("themes/images/交流论坛.png")
            },
            {
                id: 1,
                text: "经验案例",
                icon: require("themes/images/经验案例.png")
            },
            {
                id: 2,
                text: "知识文库",
                icon: require("themes/images/知识文库.png")
            },
            {
                id: 3,
                text: "设备资料",
                icon: require("themes/images/设备资料.png")
            },
        ],
        lists: [],
        notes: [],
        hotWords: [],
        dashboardRefreshing: false,
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        })
    },
    subscriptions: {
        setup({dispatch, history}) {
            history.listen(({pathname}) => {
                if (pathname === '/dashboard' || pathname === '/' || /^\/(android).+?index\.html$/.exec(pathname)) {
                    dispatch({
                        type: 'query'
                    })
                }
            })
        },
    },
    effects: {
        * query({payload, }, {call, put,select}) {

            const data = yield call(query, parse(payload))
            if (data) {

                const items=data.lists[0].items
              let {dataSource} = yield select(state => state.dashboard);
              dataSource = dataSource.cloneWithRows(items);
                checkItemsIcon(data.modules);
                checkItemsIcon(data.lists);
                data.dashboardRefreshing = false;
                yield put({
                    type: 'updateState',
                    payload: data
                })
               yield put ({
                 type:'updateItems',
                 payload:{
                   items,
                   dataSource,
                   dashboardRefreshing:false
                 }
               })
            }
        },
    },
  reducers: {
    updateItems(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },
  },
})
