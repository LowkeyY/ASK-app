import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
export default modelExtend(pageModel, {
  namespace: 'casedetail',
  state: {
    currentPage : {
      content: "云南网讯 就在传出新一代苹果手机即将发布时，有热心果粉发现，昆明出现了共享iPhone。_image_记者在国美顺城发现了这项业务，在果粉欢呼不用“卖肾”的热情过后仔细一想，似乎要得到共享iPone并不像共享单车那么简单。仅有1人实现共享据国美顺城店共享手机相关负责人张先生介绍，该店上个月开始推出共享手机业务，“不仅提供iPhone7手机的租赁，还支持iPhone7Plus、华为P10、魅族PRO7、魅族PRO7Plus、三星Galaxy S8 Plus、vivoX9s、OPPOR11等手机的租赁业务。”张先生介绍，9月12日新款iPhone手机上市后，公司计划将其作为共享租赁业务的主要推广手机。想要得到共享iPhone，需要些什么资质、条件与手续？张先生介绍，只要提供身份证和一张银行卡即可，但在办理该业务时有个条件较为繁琐，就是需要用该公司提供的相关软件检测消费者所持有的信用卡是否存在还款逾期等不良记录，如果有，将被视为申请不合格。张先生透露，从上个月开张共享业务到目前，共有8名消费者到该店办理共享业务，但信用检测合格的仅有1人。租金一年3960元共享iPhone怎么收费？张先生说，通常基本合约周期为1年，以iphone7（32G）为例，若以信用卡方式租赁，则信用卡剩余额度必须5388元，若以芝麻信用方式租赁，则芝麻信用分必须650分、蚂蚁花呗余额＞6131元。使用信用卡模式的租金是264元/期，每期25天，合约周期为15期；芝麻信用模式租金为330元/期，每期30天，合约周期为12期。如果按照芝麻信用模式来计算，一年的租金为3960元，仅比新手机的价格便宜约700元。“那我为什么要共享手机？不如直接买一台。”有顾客很是不解。张先生说，新买苹果手机须一次性支付五六千元，有的客户难以一次付清，因此可以先用共享手机。一年期满后若不想还，也有办法。比如使用信用卡模式租赁，办理时就须冻结相应额度，当顾客违约不归还手机，此部分额度便一次性扣清。",
      title : "共享手机现身昆明:年租金近4000元不如直接买一台",
      comments : [],
      imgs : ['http://i0.cnfolimg.com/uploads/img/25821/abig_2_201709121014061303.jpeg']
    },
    isShowEditor:false,
    isShowInputFoot:true
  },
})
