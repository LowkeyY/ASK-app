window.cnGlobalIndex = 0;
window.cnClearBadge = function() {
if (typeof (device) == 'undefined' || typeof (cordova) == 'undefined')
    return;
try {
    if (device && device.platform != "Android") {
        window.JPush.setApplicationIconBadgeNumber(0);
        window.JPush.setBadge(0);
    } else if (cordova.plugins.notification.badge) {
        cordova.plugins.notification.badge.clear();
    }
} catch ( exception ) {}
};
window.cnIncreaseBadge = function() {
if (typeof (cordova) == 'undefined')
    return;
if (cordova.plugins.notification.badge) {
    cordova.plugins.notification.badge.get(function(badge) {
        (badge === 0 || +badge) && cordova.plugins.notification.badge.set(badge + 1);
    });
}
};
window.cnSetAlias = function(alias) {
if (window.JPush) {
    window.JPush.setAlias({
        sequence: 1,
        alias: alias
    }, function(result) {
        //console.log(" -JPush-setAlias-success: ", result);
    }, function(error) {
        //console.log(" -JPush-setAlias-error: ", error);
    })
}
};
window.cnDeleteAlias = function() {
if (window.JPush) {
    window.JPush.deleteAlias({
        sequence: 3
    }, function(result) {
        console.log(" -JPush-deleteAlias-success: ", result);
    }, function(error) {
        console.log(" -JPush-deleteAlias-error: ", error);
    })
}
};
window.cnIsAndroid = function() {
return typeof (device) != 'undefined' && device.platform == "Android";
};
window.cnIsiOS = function() {
return typeof (device) != 'undefined' && device.platform == "iOS";
};
window.cnTakePhoto = function(cb, type) {
var onSuccess = function(cb, dataurl) {
    cb(cnCreateBlob(dataurl));
};
var onFail = function() {};
navigator.camera.getPicture(onSuccess.bind(null, cb), onFail, {
    destinationType: Camera.DestinationType.DATA_URL,
    PictureSourceType: type,
//allowEdit: true
});
};
window.cnCreateBlob = function(data, name, type) {
var arr = data.split(','),
    bstr = atob(arr.length > 1 ? arr[1] : data),
    n = bstr.length,
    u8arr = new Uint8Array(n);
while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
}
var blob = new Blob([u8arr], {
    type: type || "image/jpeg"
});
blob.name = name || "img_" + (cnGlobalIndex++) + ".jpg";
return blob;
}

window.cnChangeiOSImage = function(file, cb) {
alert(navigator.userAgent);
if (true) {
    cb(file);
    return;
}
};


const onDeviceReady = function() {
        // console.log("onDeviceReady --- ");
        try {
            window.JPush.init();
            window.JPush.setDebugMode(false);
        } catch ( exception ) {
            // console.log(exception);
        }
        window.cnClearBadge();
    },
    onResume = function() {
        // console.log("onResume --- ");
        window.cnClearBadge();
    }, /* 
                            onReceiveNotification = function() {
                                alert("onReceiveNotification");
                                if (cordova.plugins.notification.badge) {
                                    cordova.plugins.notification.badge.get(function(badge) {
                                        (badge === 0 || +badge) && cordova.plugins.notification.badge.set(badge + 1);
                                    });
                                }
                            }, */
    onOpenNotification = function(e) {
        console.log("onOpenNotification --0-- ", e);
        window.cnClearBadge();
        var params = e.extras["params"],
            obj;
        if (params && (obj = JSON.parse(params)) && obj.contentId) {
            var addParams = "",
                moduleId = obj.moduleId || "4";
            if (obj.updateId)
                addParams = "&updateId=" + obj.updateId;
            else if (obj.startId)
                addParams = "&startId=" + obj.startId;
            console.log("onOpenNotification --1-- ", "#/details?id=" + obj.contentId + "&moduleId=" + moduleId + addParams);
            window.location.href = "#/details?id=" + obj.contentId + "&moduleId=" + moduleId + addParams
        }
    },
    onExitApp = function() {
        if (typeof (navigator) != "undefined" && typeof (navigator.app) != "undefined") {
            if (window.location.href.indexOf("/login") != -1)
                navigator.app.exitApp();
            else
                navigator.app.backHistory();
        }
    };
document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("resume", onResume, false);
document.addEventListener("backbutton", onExitApp, false); // 通过监听返回键绑定退出事件
//     document.addEventListener("jpush.receiveNotification", onReceiveNotification, false);
document.addEventListener("jpush.openNotification", onOpenNotification, false);