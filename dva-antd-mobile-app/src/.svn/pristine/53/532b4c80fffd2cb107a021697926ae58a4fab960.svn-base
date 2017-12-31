import { Toast } from 'antd-mobile'
import dva from 'dva'
import createLoading from 'dva-loading'
import { browserHistory } from 'dva/router'
import 'babel-polyfill'

// 1. Initialize
const app = dva({
    ...createLoading({
        effects: true,
    }),
    history: browserHistory,
    onError(error) {
        Toast.offline(error.message)
    },
})

// 2. Model
app.model(require('./models/app'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
