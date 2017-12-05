import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { query } from 'services/dashboard'
import { model } from 'models/common'
import * as weatherService from 'services/weather'

export default modelExtend(model, {
  namespace: 'dashboard',
  state: {
     isModalShow:false
  },

  subscriptions: {
    setup ({ dispatch, history }) {
/*      history.listen(({ pathname }) => {
        if (pathname === '/dashboard' || pathname === '/') {
          dispatch({ type: 'query' })
          dispatch({ type: 'queryWeather' })
        }
      })*/
    },
  },
  effects: {
    * query ({
      payload,
    }, { call, put }) {
      const data = yield call(query, parse(payload))
      yield put({
        type: 'updateState',
        payload: data,
      })
    },
    * queryWeather ({
      payload = {},
    }, { call, put }) {
      payload.location = 'shenzhen'
      const result = yield call(weatherService.query, payload)
      const { success } = result
      if (success) {
        const data = result.results[0]
        const weather = {
          city: data.location.name,
          temperature: data.now.temperature,
          name: data.now.text,
          icon: `//s5.sencdn.com/web/icons/3d_50/${data.now.code}.png`,
        }
        yield put({
          type: 'updateState',
          payload: {
            weather,
          },
        })
      }
    },
  },
})
