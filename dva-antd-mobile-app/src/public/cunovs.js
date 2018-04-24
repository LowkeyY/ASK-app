var cunovs = {
  cnGlobalIndex: 0,
  cnkeyboardHeight: 0,
  cnCurrentTop: null,
  cnCurrentBottom: null,
  cnTopIds: ['createBbsxHeader', 'createCommentBtnnoscroll'],
  cnBottomIds: ['createBbsxBtn'],
  cnDeviceHeight: document.documentElement.clientHeight,
  cnClearBadge: function () {
    if (typeof (device) == 'undefined' || typeof (cordova) == 'undefined') {
      return
    }
    try {
      if (device && device.platform != 'Android') {
        window.JPush.setApplicationIconBadgeNumber(0)
        window.JPush.setBadge(0)
      } else if (cordova.plugins.notification.badge) {
        cordova.plugins.notification.badge.clear()
      }
    } catch (exception) {
    }
  },
  cnIncreaseBadge: function () {
    console.log(' ---------cnIncreaseBadge--------- ')
    /*if (typeof (cordova) == 'undefined')
return;
if (cordova.plugins.notification.badge) {
cordova.plugins.notification.badge.get(function(badge) {
    (badge === 0 || +badge) && cordova.plugins.notification.badge.set(badge + 1);
});
}*/
  },
  cnOnCreate: function (device) {
    console.log(' ---------cnOnCreate--------- device:' + (device || ''))
  },
  cnIsAndroid: function () {
    return typeof (device) != 'undefined' && device.platform == 'Android'
  },
  cnIsiOS: function () {
    return typeof (device) != 'undefined' && device.platform == 'iOS'
  },
  cnTakePhoto: function (cb, type) {
    var onSuccess = function (cb, dataurl) {
      cb(cnCreateBlob(dataurl))
    }
    var onFail = function () {
    }
    navigator.camera.getPicture(onSuccess.bind(null, cb), onFail, {
      //allowEdit: true //运行编辑图片
      destinationType: Camera.DestinationType.DATA_URL,
      PictureSourceType: type,
    })
  },
  cnCreateBlob: function (data, name, type) {
    var arr = data.split(',')
      , bstr = atob(arr.length > 1 ? arr[1] : data)
      , n = bstr.length
      , u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    var blob = new Blob([u8arr], {
      type: type || 'image/jpeg',
    })
    blob.name = name || 'img_' + (cnGlobalIndex++) + '.jpg'
    return blob
  },
  cnChangeiOSImage: function (file, cb) {
    cb(file)
  },
  cnGetEL: function (ids) {
    if (Array.isArray(ids)) {
      var el = null
      if (ids.length) {
        for (var i = 0; !el && i < ids.length; i++) {
          el = document.getElementById(ids[i])
        }
      }
      return el
    }
    return ids && document.getElementById(ids) || null
  },
  cnSetPosition: function () {
    if (cnIsiOS) {
      const y = document.documentElement.scrollHeight - document.documentElement.clientHeight - window.scrollY
      cnCurrentTop && (cnCurrentTop.style.transform = 'translateY(' + (/noscroll$/g.test(cnCurrentTop.id) ? 0 - y - cnCurrentTop.clientHeight : window.scrollY - cnCurrentTop.clientHeight) + 'px)')
      cnCurrentBottom && (cnCurrentBottom.style.transform = 'translateY(' + (0 - y - cnCurrentBottom.clientHeight) + 'px)')
    }
  },
  cnSetStatusBarStyle: function (router) {
    if (typeof (StatusBar) != 'undefined') {
      if (cnIsAndroid()) {
        StatusBar.styleLightContent()
        StatusBar.backgroundColorByHexString('#108ee9')
      } else {
        router = router || '/'
        switch (router) {
          case '/':
          case '/dashboard':
          case '/typequery':
          case '/mine':
          case '/login': {
            StatusBar.styleLightContent()
            StatusBar.backgroundColorByHexString('#108ee9')
            break
          }
          case '/search': {
            StatusBar.styleDefault()
            StatusBar.backgroundColorByHexString('#efeff4')
            break
          }
          default: {
            StatusBar.styleDefault()
            StatusBar.backgroundColorByHexString('#ffffff')
          }
        }
      }
    }
  },
  cnDotest: function () {
    if (cnIsiOS) {
      cnCurrentTop = cnGetEL(cnTopIds)
      cnCurrentBottom = cnGetEL(cnBottomIds)
    }
  },
  cnShowToast: function (d, time) {
    //退出提示
    var dialog = document.createElement('div')
    dialog.style.cssText = 'position:fixed;' + 'font-size:12px;' + 'left:50%;' + 'bottom:5%;' + 'background-color:rgba(0,0,0,0.5);' + 'z-index:9999;' + 'padding:5px 10px;' + 'color:#fff;' + 'border-radius:5px;' + 'transform:translate(-50%,-50%);' + '-webkit-transform:translate(-50%,-50%);' + '-moz-transform:translate(-50%,-50%);' + '-ms-transform:translate(-50%,-50%);' + '-o-transform:translate(-50%,-50%);'
    dialog.innerHTML = d
    document.getElementsByTagName('body')[0].appendChild(dialog)
    setTimeout(function () {
      if (dialog) {
        document.getElementsByTagName('body')[0].removeChild(dialog)
      }
    }, time || 2000)
  },
  cnGetManufacturer: function () {
    if (cnIsiOS())
      return "";
    return "";
    //return (device.manufacturer || 'unkown').toLowerCase()
  },
  cnPushSeviceInit: function () {
    try {
      switch (cnGetManufacturer()) {
        case 'xiaomi': {
          break
        }
        case 'huawei': {
          break
        }
        default: {
          window.JPush.init()
          window.JPush.setDebugMode(false)
        }
      }
    } catch (exception) {// console.log(exception);
    }
  },
  cnSetAlias: function (alias, accessToken) {
    if (typeof(window.CunovsAliasPlugin) === 'object')
      window.CunovsAliasPlugin.setAlias({accessToken: accessToken, alias: alias});
  },
  cnDeleteAlias: function (accessToken) {
    if (typeof(window.CunovsAliasPlugin) === 'object')
      window.CunovsAliasPlugin.deleteAlias({accessToken: accessToken});
  },
}

if (Object.assign) {
  Object.assign(window, cunovs)
} else {
  for (var att in cunovs) {
    window[att] = cunovs[att]
  }
}

(function () {
    var onDeviceReady = function () {
        cnDeviceHeight = document.documentElement.clientHeight
        console.log('onDeviceReady --- ', cnDeviceHeight)
        cnPushSeviceInit()
        if (typeof (StatusBar) != 'undefined') {
          StatusBar.overlaysWebView(false)
          cnSetStatusBarStyle()
        }
        window.cnClearBadge()
      }
      , onResume = function () {
        // console.log("onResume --- ");
        window.cnClearBadge()
      }
      , /*
                            onReceiveNotification = function() {
                                alert("onReceiveNotification");
                                if (cordova.plugins.notification.badge) {
                                    cordova.plugins.notification.badge.get(function(badge) {
                                        (badge === 0 || +badge) && cordova.plugins.notification.badge.set(badge + 1);
                                    });
                                }
                            }, */
      onOpenNotification = function (e) {
        window.cnClearBadge()
        var params = e.extras['params'], obj
        if (params && (obj = JSON.parse(params)) && obj.contentId) {
          var addParams = ''
            , moduleId = obj.moduleId || '4'
          if (obj.updateId) {
            addParams = '&updateId=' + obj.updateId
          } else if (obj.startId) {
            addParams = '&startId=' + obj.startId
          }
          //console.log("onOpenNotification --1-- ", "#/details?id=" + obj.contentId + "&moduleId=" + moduleId + addParams);
          window.location.href = '#/details?id=' + obj.contentId + '&moduleId=' + moduleId + addParams
        }
      }
      , exitApp = function () {
        navigator.app.exitApp()
      }
      , onExitApp = function () {
        if (typeof (navigator) != 'undefined' && typeof (navigator.app) != 'undefined') {
          var curHref = window.location.href
          if (curHref.indexOf('/login') != -1) {
            navigator.app.exitApp()
          } else if (curHref.indexOf('/?_k') != -1) {
            cnShowToast('再按一次退出ASK平台')
            document.removeEventListener('backbutton', onExitApp, false)
            document.addEventListener('backbutton', exitApp, false)
            var intervalID = window.setTimeout(function () {
              window.clearTimeout(intervalID)
              document.removeEventListener('backbutton', exitApp, false)
              document.addEventListener('backbutton', onExitApp, false)
            }, 2000)
          } else {
            navigator.app.backHistory()
          }
        }
      }
    document.addEventListener('deviceready', onDeviceReady, false)
    document.addEventListener('resume', onResume, false)
    document.addEventListener('backbutton', onExitApp, false)
    // 通过监听返回键绑定退出事件
    // document.addEventListener("jpush.receiveNotification", onReceiveNotification, false);
    document.addEventListener('jpush.openNotification', onOpenNotification, false)

    window.addEventListener('keyboardWillShow', function () {
      if (cnIsiOS) {
        cnCurrentTop = cnGetEL(cnTopIds)
        cnCurrentBottom = cnGetEL(cnBottomIds)
      }
    })
    window.addEventListener('keyboardDidShow', function (e) {
      cnkeyboardHeight = e.keyboardHeight
      cnCurrentTop && (cnCurrentTop.style.top = '',
        cnCurrentTop.style.position = 'absolute')
      cnCurrentBottom && (cnCurrentBottom.style.bottom = '',
        cnCurrentBottom.style.position = 'absolute')
      Keyboard && Keyboard.disableScrollingInShrinkView(!!(cnCurrentTop && /noscroll$/g.test(cnCurrentTop.id)))
      cnSetPosition()
    })

    window.addEventListener('keyboardDidHide', function () {
      cnCurrentTop && (cnCurrentTop.style.transform = '',
        cnCurrentTop.style.position = 'fixed',
        cnCurrentTop.style.top = 0)
      cnCurrentTop = null
      cnCurrentBottom && (cnCurrentBottom.style.transform = '',
        cnCurrentBottom.style.position = 'fixed',
        cnCurrentBottom.style.bottom = 0)
      cnCurrentBottom = null
      Keyboard && Keyboard.disableScrollingInShrinkView(false)
    })

    window.onscroll = function () {
      cnSetPosition()
    }
    window.ontouchmove = function () {
      cnSetPosition()
    }
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body)
      }, false)
    }
  })()
