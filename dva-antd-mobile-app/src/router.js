import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from 'routes/app'

const registerModel = (app, model) => {
    if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
        app.model(model)
    }
}

const Routers = function({history, app}) {
    const routes = [
        {
            path: '/',
            component: App,
            getIndexRoute(nextState, cb) {
                require.ensure([], (require) => {
                    registerModel(app, require('models/dashboard'));
                    cb(null, {
                        component: require('routes/dashboard/')
                    })
                }, 'dashboard')
            },
            childRoutes: [
                {
                    path: 'login',
                    getComponent(nextState, cb) {
                        require.ensure([], (require) => {
                            registerModel(app, require('models/login'));
                            cb(null, require('routes/login/'))
                        }, 'login')
                    },
                },{
                    path: 'mine',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            registerModel(app, require('models/mine/'));
                            cb(null, require('routes/mine/'))
                        }, 'mine')
                    }
                },
                {
                    path: 'searchuser',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            registerModel(app, require('models/searchuser'))
                            cb(null, require('routes/searchuser/'))
                        }, 'searchuser')
                    }
                },
                {
                    path: 'mylist',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            registerModel(app, require('models/mylist'));
                            cb(null, require('routes/mylist/'))
                        }, 'mylist')
                    }
                },
                {
                    path: 'details',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            registerModel(app, require('models/details'));
                            cb(null, require('routes/details/'))
                        }, 'details')
                    }
                }
                , {
                    path: 'mysets',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            registerModel(app, require('models/mysets'));
                            cb(null, require('routes/mysets/'))
                        }, 'mysets')
                    }
                }, {
                    path: 'fontcontrol',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            registerModel(app, require('models/fontcontrol'));
                            cb(null, require('routes/fontcontrol/'))
                        }, 'fontcontrol')
                    }
                }
                , {
                    path: 'discuss',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            registerModel(app, require('models/discuss'));
                            cb(null, require('routes/discuss/'))
                        }, 'discuss')
                    }
                }, {
                    path: 'pagecontent',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            registerModel(app, require('models/pagecontent'));
                            cb(null, require('routes/pagecontent/'))
                        }, 'pagecontent')
                    }
                }, {
                    path: 'typequery',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            registerModel(app, require('models/typequery'));
                            registerModel(app, require('models/querylist'));
                            cb(null, require('routes/typequery/'))
                        }, 'typequery')
                    }
                }, {
                    path: 'test',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            registerModel(app, require('models/test'));
                            cb(null, require('routes/test/'));
                        }, 'test')
                    }
                }, {
                    path: 'search',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            registerModel(app, require('models/search'))
                            cb(null, require('routes/search/'))
                        }, 'search')
                    }
                }, {
                    path: 'creates',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            registerModel(app, require('models/creates'));
                            cb(null, require('routes/creates/'))
                        }, 'creates')
                    }
                },
                {
                    path: 'preview',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            registerModel(app, require('models/preview'));
                            cb(null, require('routes/preview/'))
                        }, 'preview')
                    }
                },
                {
                    path: 'pdfcontent',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            registerModel(app, require('models/pdfcontent'));
                            cb(null, require('routes/pdfcontent/'))
                        }, 'pdfcontent')
                    }
                },
              {
                path: 'agreement',
                getComponent(nextState, cb) {
                  require.ensure([], require => {
                    registerModel(app, require('models/agreement'));
                    cb(null, require('routes/agreement/'))
                  }, 'agreement')
                }
              },
              {
                path: 'hotwordsresult',
                getComponent(nextState, cb) {
                  require.ensure([], require => {
                    registerModel(app, require('models/hotwordsresult'));
                    cb(null, require('routes/hotwordsresult/'))
                  }, 'hotwordsresult')
                }
              },
              {
                    path: '*',
                    getComponent(nextState, cb) {
                        console.log("* -> ", nextState);
                        const {location : {pathname}} = nextState;
                        if (pathname && pathname.endsWith("index.html")) {
                            //if (pathname && /^\/(android).+?index\.html$/.exec(pathname)) {
                            require.ensure([], require => {
                                registerModel(app, require('models/dashboard'));
                                cb(null, require('routes/dashboard/'))
                            })
                        } else {
                            require.ensure([], (require) => {
                                cb(null, require('routes/error/'))
                            }, 'error')
                        }
                    },
                }, {
                    path: 'dashboard',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            registerModel(app, require('models/dashboard'));
                            cb(null, require('routes/dashboard/'))
                        }, 'dashboard')
                    }
                }
            ],
        },
    ]

    return <Router history={ history } routes={ routes } />
}

Routers.propTypes = {
    history: PropTypes.object,
    app: PropTypes.object,
}

export default Routers

