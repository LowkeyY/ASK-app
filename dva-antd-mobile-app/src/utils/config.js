module.exports = {
    name: 'AntD Admin',
    prefix: 'antdAdmin',
    footerText: 'Ant Design Admin  © 2017 zuiidea',
    logo: '/logo.png',
    iconFontCSS: '/iconfont.css',
    iconFontJS: '/iconfont.js',
    CORS: [],
    openPages: ['/login', '/search', '/pagecontent', '/mylist', '/mysets', '/creates', '/pdfcontent', '/fontcontrol', '/discuss', '/details', '/searchuser', '/error', '/hotwordsresult', '/preview'],
    noLoaderPages: ['/mylist'],
    baseURL: 'http://192.168.0.119:8088',
    notRedirectSign: '_not_redirect_',
    accessToken: 'CNESSIONID',
    api: {
        userLogin: `/apilogin/login.jcp`,
        userLogout: `/apilogin/logout.jcp`,

        dashboard: `/api/dashboard.jcp`,
        typequery: `/api/typequery.jcp`,

        createbbsxApi: "/api/create/createbbsx.jcp",

        querycommends: "/api/query/querycommend.jcp",
        querycontent: "/api/query/querycontent.jcp",
        querylist: "/api/query/querylist.jcp",
        querypdfApi: "/api/query/querypdf.jcp",
        querypt: "/api/query/querypt.jcp",
        queryauthsApi: "/api/query/queryuserdeleteauth.jcp",
        queryuserlist: "/api/query/queryuserlist.jcp",

        recordcommentsApi: "/api/record/recordcomments.jcp",
        recordvisitsApi: "/api/record/recordvisits.jcp",

        querysearchattApi: "/api/search/searchquery.jcp",
        querysearchlistApi: "/api/search/searchlist.jcp",

        mylistApi: "/api/user/mylist.jcp",
        userAvatar: "/api/user/userAvatar.jcp",
        userInfo: "/api/user/userInfos.jcp",
        userOptApi: "/api/user/userOpts.jcp"

    },
}
