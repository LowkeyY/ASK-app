import { request, config } from 'utils'
import { getMockData, getHotWord, getInfoWord } from 'utils'

const {api : {typequery}} = config

export async function query(params) {
    /*    const modules = [
                {
                    value: 1,
                    text: "交流论坛"
                },
                {
                    value: 2,
                    // text: "经验案例",
                },
                {
                    value: 3,
                    text: "设备资料",
                },
                {
                    value: 4,
                    text: "知识文库",
                }, {
                    value: 5,
                    text: "热词",
                }, {
                    value: 6,
                    text: "通知公告"
                }
            ],
            moduleMenu = {
                1: [{
                    title: "版块",
                    key: "plates",
                    items: [{
                        text: '全部版块',
                        value: '1'
                    }, {
                        value: '19',
                        text: '加速器'
                    }, {
                        value: '2',
                        text: '探测器'
                    }, {
                        value: '3',
                        text: '扫描控制'
                    }, {
                        value: '4',
                        text: '扫描装置'
                    }, {
                        value: '6',
                        text: '软件'
                    }, {
                        value: '8',
                        text: '综合'
                    }, {
                        value: '9',
                        text: '其它'
                    }, {
                        value: '11',
                        text: '图像获取'
                    }, {
                        value: '12',
                        text: '辐射防护'
                    }, {
                        value: '13',
                        text: '土建'
                    }, {
                        value: '14',
                        text: '故障直通车'
                    }, {
                        value: '15',
                        text: '产品小贴士'
                    }, {
                        value: '16',
                        text: '保养百问'
                    }, {
                        value: '18',
                        text: '算法'
                    }]
                }, {
                    title: "状态",
                    key: "status",
                    items: [{
                        text: '全部状态',
                        value: '0'
                    }, {
                        text: '讨论中',
                        value: '1'
                    }, {
                        text: '已解决',
                        value: '2'
                    }]
                }],
                2: [{
                    title: "所属类型",
                    key: "ctype",
                    items: [{
                        text: '全部分类',
                        value: '1'
                    }, {
                        text: '优秀案例',
                        value: '2'
                    }, {
                        value: '146',
                        text: '安装调试'
                    }, {
                        value: '147',
                        text: '故障维修'
                    }, {
                        value: '148',
                        text: '维护保养'
                    }, {
                        value: '149',
                        text: '改善维修'
                    }, {
                        value: '150',
                        text: '自由格式'
                    }]
                }, {
                    title: "排序方式",
                    key: "sorts",
                    items: [{
                        text: '按上传日期排序',
                        value: "0"
                    }, {
                        text: '按评论次数排序',
                        value: "1"
                    }, {
                        text: '按预览次数排序',
                        value: "2"
                    }]
                }],
                3: [{
                    title: "所在目录",
                    key: "dirs",
                    items: [{
                        text: '所有目录',
                        value: '1'
                    }, {
                        text: '优秀案例',
                        value: '2'
                    }, {
                        value: '146',
                        text: '安装调试'
                    }, {
                        value: '147',
                        text: '故障维修'
                    }, {
                        value: '148',
                        text: '维护保养'
                    }, {
                        value: '149',
                        text: '改善维修'
                    }, {
                        value: '150',
                        text: '自由格式'
                    }]
                }, {
                    title: "排序方式",
                    key: "sorts",
                    items: [{
                        text: '按上传日期排序',
                        value: "0"
                    }, {
                        text: '按评论次数排序',
                        value: "1"
                    }, {
                        text: '按预览次数排序',
                        value: "2"
                    }]
                }],
                4: [{
                    title: "文档类型",
                    key: "ktype",
                    items: [{
                        value: '1',
                        text: '全部分类'
                    }, {
                        value: '154',
                        text: '机械液压'
                    }, {
                        value: '155',
                        text: '电子技术'
                    }, {
                        value: '156',
                        text: '电气控制'
                    }, {
                        value: '217',
                        text: '计算机'
                    }, {
                        value: '218',
                        text: '加速器'
                    }, {
                        value: '219',
                        text: '工具仪表'
                    }, {
                        value: '220',
                        text: '技能技巧'
                    }]
                }, {
                    title: "排序方式",
                    key: "sorts",
                    items: [{
                        text: '按上传日期排序',
                        value: "0"
                    }, {
                        text: '按评论次数排序',
                        value: "1"
                    }, {
                        text: '按预览次数排序',
                        value: "2"
                    }]
                }],
                5: [{
                    title: "选择热词",
                    key: "lists",
                    items: [
                        {
                            value: 'b48a9080-07e2-41f9-8061-fef00611c368',
                            text: '测试测试'
                        },
                        {
                            value: '9142094a-a6e5-4283-bad2-ad222387c327',
                            text: '西门西门'
                        },
                        {
                            value: '261ff22f-e095-4bd1-ba78-64a8c167d1da',
                            text: '通讯通讯'
                        },
                        {
                            value: 'b74a031f-6f6f-4211-a818-8d64ccf977e8',
                            text: '测试题题'
                        },
                        {
                            value: '90a13857-92b3-497b-8406-e9c017d308f3',
                            text: '液压千斤'
                        },
                        {
                            value: '92ab86f2-2b62-46f9-a516-b8ff7fb92172',
                            text: '压力测试'
                        },
                        {
                            value: '0db7b924-6d16-45bc-b7cf-438ed7f0ebe1',
                            text: '热搜热搜'
                        },
                        {
                            value: '0db7b924-6d16-45bc-b7cf-438ed7f0ebe2',
                            text: '技术专家'
                        }]
                }, {
                    title: "版块分类",
                    key: "htypes",
                    items: [{
                        text: '全部内容',
                        value: 0
                    }, {
                        text: '交流论坛',
                        value: 4
                    }, {
                        text: '经验案例',
                        value: 1
                    }, {
                        text: '知识文库',
                        value: 2
                    }, {
                        text: '设备资料',
                        value: 3
                    },]
                }],
                6: [{
                    title: "排序方式",
                    key: "sorts",
                    items: [{
                        text: '按上传日期排序',
                        value: "0"
                    }]
                }]
        }

        return {
            modules,
            moduleMenu
        }*/
    return request({
        url: typequery,
        method: 'get',
        data: params,
    })
}
