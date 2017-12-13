/* global window */
import classnames from 'classnames'
import lodash from 'lodash'
import config from './config'
import request from './request'
import { color } from './theme'

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}


/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = lodash.cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

const getLocalIcon = (icon) => {
    const regex = /\/([^\/]+?)\./g;
    let addIconName = [];
    if(icon.startsWith("/") && (addIconName = regex.exec(icon)) && addIconName.length > 1){
      const addIcon = require(`svg/${icon.substr(1)}`);
      return `#${addIconName[addIconName.length - 1]}`;
    }
    return icon;
}
const mockGrids = [
    {id:1,text:"交流论坛" , icon : require("themes/images/交流论坛.png")},
    {id:2,text:"经验案例" , icon : require("themes/images/经验案例.png")},
    {id:3,text:"设备资料" , icon : require("themes/images/设备资料.png")},
    {id:4,text:"知识文库" , icon : require("themes/images/知识文库.png")},
  ] ,
  hotWords = [
    { id : 'b48a9080-07e2-41f9-8061-fef00611c368', text: '测试测试' },
    { id : '9142094a-a6e5-4283-bad2-ad222387c327', text: '西门西门' },
    { id : '261ff22f-e095-4bd1-ba78-64a8c167d1da', text: '通讯通讯' },
    { id : 'b74a031f-6f6f-4211-a818-8d64ccf977e8', text: '测试题题' },
    { id : '90a13857-92b3-497b-8406-e9c017d308f3', text: '液压千斤' },
    { id : '92ab86f2-2b62-46f9-a516-b8ff7fb92172', text: '压力测试' },
    { id : '0db7b924-6d16-45bc-b7cf-438ed7f0ebe1', text: '热搜热搜' },
    { id : '0db7b924-6d16-45bc-b7cf-438ed7f0ebe1', text: '技术专家' }
  ] ,
  infoWords = [
    {
      title : '交流论坛技术专家：加速器（阎忻水、高峰、贾玮、刘晋升、何宇、管伟强）；探测器（李树伟、邹湘）；软件（丰明君、胡文杰）；算法（徐光明、张浩然、温宏胜、朱强强）；扫描控制（倪京海）；扫描装置（孟辉、樊旭平）；图像获取（冯博、马旭明）；辐射防护（张晓丽、王兵）；土建（潘辉、黄锡萍）。',
      author : '吴玉洁',
      date : '2017-09-06 16:43:00'
    },{
      title : '值此新春佳节来临之际，ASK平台向各位领导同事，尤其是仍坚守在工作岗位的各位现场工程师们拜年了，衷心感谢大家对平台建设作出的贡献，祝福大家新的一年，平安喜乐，幸福安康！',
      author : '王烁3',
      date : '2017-01-25 11:07:50'
    },
    {
      title : '第一期版主：综合—李德胜；加速器—刘福胜、韩桦、贾海亮；探测器—房国梁；控制—杲永鹏、袁中毅；机械—李思军；运检—崔文杰。',
      author : '王烁3',
      date : '2016-10-17 15:20:25'
    },
    {
      title : '技术专家：加速器（印炜、高峰、阎忻水、贾玮、刘晋升、何宇、管伟强）；探测器（李树伟、邹湘）；运行检查（丰明君（软件）、胡文杰（软件）、徐光明（算法）、张浩然（算法）、温宏胜（算法）、朱强强（算法））；扫描控制（倪京海）；扫描装置（孟辉、樊旭平）；图像获取（冯博、马旭明）；辐射防护（张晓丽、王兵）；土建（潘辉、黄锡萍）。',
      author : '王烁3',
      date : '2016-10-09 17:56:47'
    }
  ] ,
  mockDatas = {
  "2" : {
      title2 : "【经验案例】设备不能正常出束故障",
      date2 : "2016-12-07 15:51:38",
      author2 :"易欢明",
      dept2 : "国内营销服务中心-华东销售服务中心",
      content2 : "<h5>【状态监测】</h5><p>&nbsp;</p><p>Wincc界面操作点出束时报扫描中断，无法正常出束，设备又回到就绪状态。查看Wincc报警界面，没有发现任何报警，界面一切显示都正常，后来通过长期观察，故障越来越频繁发现报警界面显示黄灯故障。dias日志显示收到扫描中断命令。</p><p>&nbsp;<img alt='UEditor_snapScreen_tmp1481089050381079668.jpg' src='http://ask.nuctech.com/ueditor/jsp/upload/image/20161207/UEditor_snapScreen_tmp1481089050381079668.jpg'/></p><p>&nbsp;</p><h5>【维修方案】</h5><p>&nbsp;</p><p>引发该故障可能有以下几个原因：</p><p>1、&nbsp;&nbsp;&nbsp; 加速器故障，该故障只是闪烁一下，系统没有保存；</p><p>2、&nbsp;&nbsp;&nbsp; PLC故障，故障只是闪烁一下，系统没有保存；</p><p>3、&nbsp;&nbsp;&nbsp; 安全联锁问题；</p><p>4、&nbsp;&nbsp;&nbsp; WinCC和PLC通讯问题；</p><p>5、&nbsp;&nbsp;&nbsp; PLC和dias通讯问题 。</p><p>电话咨询其它站点及技术主管得知国外有站点出现过类似的情况，那次故障原因是由于档杆被风吹动导致安全联锁未就绪。北仑五期现场检查档杆状态正常，通过检测PLC程序盯着档杆状态，甚至跳接档杆状态点仍无效果，没得到切实的解决办法，准备检查计算机与PLC、DA/CM模块通讯，检查PLC是否工作正常，将设备重启看故障是否会消失。如果仍没发现异常就通过在线监测PLC程序查看出束条件中哪个条件不成立，然后找到出束条件不成立的原因。</p><p>&nbsp;</p><h5>【维修实施】</h5><p>&nbsp;</p><p>1、查看操作界面、触摸屏及AFC触摸屏均未发现有报警，电子枪灯丝电流、电压，磁灯丝电流、电压均正常，检查光纤通讯，更换成备用网线通讯故障仍存在，ping PLC IP地址正常，ping DA/CM IP地址正常。断掉探测器电源，过一分钟再送上通讯模块指示灯闪烁正常。</p><p>2、检查PLC，没有发现异常，各指也均示灯显示正常。</p><p>3、将设备断电重新启动，故障仍存在，经观察发现操作员点出束后，报扫描中断，然后操作台黄灯（就绪灯）会闪烁一下，正常就绪后应该是长亮。怀疑是黄色警灯故障引起的，用笔记本连接PLC程序，在线监测安全联锁里的黄灯故障点M414.1,未发现异常，可能是中断时间较短，程序只是闪烁一下很难观察到，由于现场设备需要急用，不能长时间停机，故将黄色警灯报警信号点M414.1屏蔽，再测试出束可以正常出束，如下图。</p><p>&nbsp;<img alt='UEditor_snapScreen_tmp1481089106865000544.jpg' src='http://ask.nuctech.com/ueditor/jsp/upload/image/20161207/UEditor_snapScreen_tmp1481089106865000544.jpg'/></p><p>跳转到M414.1输出点，如下图</p><p><img alt='UEditor_snapScreen_tmp1481089147878011678.jpg' src='http://ask.nuctech.com/ueditor/jsp/upload/image/20161207/UEditor_snapScreen_tmp1481089147878011678.jpg'/></p><p>由于安调时候，警铃故障报警已经被屏蔽了。所以完全可以断定是由于黄灯故障引起的（后面天气越热，故障率越高，直接一直报黄灯故障，红灯、绿灯故障也陆陆续续的出现）。跳转到黄灯故障M413.4如下图</p><p><img alt='UEditor_snapScreen_tmp1481089187022017899.jpg' src='http://ask.nuctech.com/ueditor/jsp/upload/image/20161207/UEditor_snapScreen_tmp1481089187022017899.jpg'/></p><p>黄灯故障点M413.4是直接由current monitor模块给PLC输入点I13.4信号的。警灯接线图如下图</p><p><img alt='UEditor_snapScreen_tmp1481089230176064210.jpg' src='http://ask.nuctech.com/ueditor/jsp/upload/image/20161207/UEditor_snapScreen_tmp1481089230176064210.jpg'/></p><p>&nbsp;</p><p><img alt='UEditor_snapScreen_tmp1481089251724036350.jpg' src='http://ask.nuctech.com/ueditor/jsp/upload/image/20161207/UEditor_snapScreen_tmp1481089251724036350.jpg'/></p><p><img alt='UEditor_snapScreen_tmp1481089274874081891.jpg' src='http://ask.nuctech.com/ueditor/jsp/upload/image/20161207/UEditor_snapScreen_tmp1481089274874081891.jpg'/></p><p>将黄灯报警屏蔽并测试可以正常出束后，通知操作设备可以正常使用，观察大厅入口、出口黄灯闪烁正常。查看警灯警铃报警模块说明书如下图</p><p><img alt='UEditor_snapScreen_tmp1481089306022044318.jpg' src='http://ask.nuctech.com/ueditor/jsp/upload/image/20161207/UEditor_snapScreen_tmp1481089306022044318.jpg'/></p><p>报警电流设置&nbsp;：</p><p>LED 灯和警铃的报警电流出厂设置为10mA，爆闪灯的报警电流出厂设置为 100mA 。</p><p>用户可以通过按键重新设置。&nbsp;</p><p>打开仪器上盖，电路板左下方有三个按键：</p><p>MOVE&nbsp;&nbsp;&nbsp; ADD &nbsp;&nbsp;&nbsp;ENTER &nbsp;</p><p>1)&nbsp; 点击“Enter”进入设置模式，此时第一位数</p><p>码管将闪烁，显示准备设置的通道。<br/><img alt='UEditor_snapScreen_tmp1481089343934037552.jpg' src='http://ask.nuctech.com/ueditor/jsp/upload/image/20161207/UEditor_snapScreen_tmp1481089343934037552.jpg'/></p><p>2)&nbsp; 点击“Add ”改变准备设置的通道。&nbsp;</p><p>3)&nbsp; 点击“Move”，进入参数调节。&nbsp;</p><p>4)&nbsp; 点击“Add ”、“Move”调节参数，参数最大</p><p>值为500mA 。&nbsp;</p><p>5)&nbsp; 点击“Enter”退出当前通道的参数调节。&nbsp;</p><p>6)&nbsp; 再点击“Enter”，退出参数设置</p><p>4、五期现场目前是将黄、绿、红三个灯的电流设定值由默认的100mA改为60mA，预警及出束警铃电流设定值由默认10mA改为6mA。然后通过在程序中增加计数器来观察报警频率，如下图</p><p><img alt='UEditor_snapScreen_tmp1481089380986053929.jpg' src='http://ask.nuctech.com/ueditor/jsp/upload/image/20161207/UEditor_snapScreen_tmp1481089380986053929.jpg'/></p><p>继续观察了几天发现修改模块设置后效果虽然有点，但故障还是经常出现，而且后面几天红灯、绿灯故障均出现，下午查看模块显示入口绿灯电流最小值既然为0mA，早上八点开机太阳照在出口时入口绿灯电流为600mA，中午12点变为200mA。因此可以怀疑五期现场警灯故障是由于温度较高的原因影响到警灯Current Monitor模块检测的电流，导致警灯故障出现，安全联锁不就绪，设备无法出束。</p><p>对于此类故障处理，为不影响正常过机我们可以先在程序中将报警信号屏蔽或者在current monitor 上将报警信号跳接（既将K1、K2、K3、K4、K5中报警对应的短接），等设备停机时再更换警灯或Current Monitor 模块，利用排除法来排除故障。北仑五期现场先更换了入口警灯观察，无效果，天气炎热的时候入口警灯故障一直报，检测电流直接显示为0。等Current Monitor模块备件到达现场候，更换备件观察发现警灯电流显示500mA左右，未报警灯故障，通过几天观察，警灯故障未再出现。故障排除，将PLC程序复原。</p><h5>【归纳总结】</h5><p>&nbsp;</p><p>此次故障排除也利用了“三板斧”原则，在电话咨询及设备断电重启皆未得到解决的时候，再深入的查找并了解故障。在解决故障过程中也由于备件储备不够充分，为不影响设备正常使用，通过暂时的将故障点屏蔽。故障刚出现时没有明确的故障信息，直观上很难发现故障原因，借鉴自己以前查找故障的经验，从内部PLC程序入手，顺藤摸瓜，方便快速的找到了导致故障的原因（当然随着后面故障的频发，故障信息也表现的明显了）。通过长期观察了解故障特性。最后将原因锁定在警灯和Current Monitor模块上，待备件到达时再通过排除法将故障解决。</p><p>&nbsp;&nbsp;&nbsp; 有什么不足的地方还请多多指点。谢谢！</p><p>&nbsp;</p>",
      keywords2 : "设备不能出束",
      stype2 : "扫描控制",
      wtype2 : "故障维修",
      snum2 : "MB1215DE(HS)",
      isnew2 : false
    },
  "1" : {
      title :"【交流论坛】土耳其mersin港口纠偏系统error0故障小纪",
      date : "2017-09-04 09:36:10",
      creates : '2017-8-31 3:31:15',
      author :"郭强1",
      views : '70',
      replys : '2',
      plates : '故障直通车',
      status : '讨论中',
      content : "<p>土耳其mersin港口双能H车几乎每天早上10点到11点就会报警纠偏故障。当地工程师每天去现场摆正车体复位后再交给海关使用。这种每天重复性的故障对我们的工作及客户的使用都造成了很不好的影响。所以我对这个问题进行了研究，期间做了很多错误的判断，我想把这些都写出来供大家借鉴。</p><p>1，我刚接手这台设备时，原来的工程师告诉我阳光对驾驶室内的传感器有很大的影响。所以我找到一些遮光材料（纸壳）将驾驶室遮住，但故障没有解决。</p><p>2，我观察到加速器底下的测距传感器测量数据有大概+-5mm的波动，而操作室侧传感器大概+-1mm的波动。我考虑是不是因为这个传感器有问题呢。但仔细想了一下系统的工作原理，S2测量值在+-5mm的范围内波动系统应该控制车体小范围的S型行走而不应该导致车体大范围跑偏。于是放弃了这个思路。</p><p>3，因为故障具有很强的时间特性，所以我早上9点到现场观察情况。测试发现报警。复位摆正后又报警。观察传感器情况。操作室侧传感器显示屏上信号显示LOW，有时显示no signal。后传感器信号正常。查找传感器说明书有如附图中解释。</p><p>更换前后传感器后，信号问题依旧留在前传感器位置，说明不是传感器本身器件问题。</p><p>后传感器因为有加速器仓，阳光没有直射纠偏板。而前传感器上午时纠偏板上阳光直射，反射光强。我测试了挡住照在纠偏板上的阳光，发现信号变强了。我觉得这应该是上午阳光直射纠偏板造成传感器信号不正常。如果长时间不正常的信号输入，那肯定会造成纠偏故障。这样也解释了为什么故障和时间有很强的联系。于是我制作了简单的测试，用手挡住纠偏板上的阳光，让当地工程师走车10次，无报警。不挡光，走车2次，报警。</p><p>制作12cm纸壳条粘到纠偏板上为纠偏板遮阳，继续测试。10天未报警，10天过后几乎每天的报警状况依旧存在。</p><p>4，从别的现场再次来到到这个现场已经过了20天。我考虑到纸壳这种临时的材料在户外坚持10天就是说明大方向没问题。于是在当地市场找到12cm的广告塑料板安装正式的纠偏板遮阳。但是这种正式的纠偏板并未如想象中的将问题解决。</p><p>5，我按照二代纠偏板安装调试指导书对传感器参数进行了设置调整。后传感器X1值降低10mm。行走10次，观察电子管数值变化基本为48-51。我认为参数应该问题不大了。但第二天就打了脸。</p><p>6，重新考虑整个处理过程，12cm塑料板虽然不怕风吹日晒但安装需要稳定牢固，实际探出纠偏板的长度可能没有纸壳多。将小红点调整进阴影区域，故障依旧。</p><p>7，为了避免走进思维盲区，决定更换主控盒试试。当地工程师反映传感器信号变好了。</p><p><br/></p><p>现状：更换主控盒后10天了，期间报警1次。故障现象可以说有所改善，但还在持续观察。有问题还需要解答。纸壳遮阳能坚持10天无报警，说明方法对路，为什么正式材料就不行了呢，调整纠偏传感器小红点位置也不行？如果真的是主控盒问题，那遮住阳光的临时测试又怎么解释呢？我的理解是主控盒提供给传感器24V电压，传感器给主控盒传回模拟量信号。如果是主控盒故障这样无法解释故障与时间的关联性。</p><p><br/></p><p>最后感谢产品本部的毛玉国毛工，他给了我很多建议和帮助。这个问题我还会持续研究，如果有新的进展再进行汇报。</p><p style='text-align: center'><br/></p><p style='text-align: center'><br/></p><p style='text-align: center'><br/></p><p style='text-align: center'><img src='https://ask.nuctech.com/ueditor/jsp/upload/image/20170831/4196467033876640781504120855221032870.jpg' style='' title='4196467033876640781504120855221032870.jpg'/></p><p style='text-align: center'><img src='https://ask.nuctech.com/ueditor/jsp/upload/image/20170831/IMG_20170804_1402311504120855951005496.jpg' style='' title='IMG_20170804_1402311504120855951005496.jpg'/></p><p style='text-align: center'><img src='https://ask.nuctech.com/ueditor/jsp/upload/image/20170831/IMG_20170804_1402241504121215415064822.jpg' style='' title='IMG_20170804_1402241504121215415064822.jpg'/></p><p style='text-align: center'><img src='https://ask.nuctech.com/ueditor/jsp/upload/image/20170831/605264334432144151504121216155010410.jpg' style='' title='605264334432144151504121216155010410.jpg'/></p><p style='text-align: center'><img src='https://ask.nuctech.com/ueditor/jsp/upload/image/20170831/4256273853475260401504121217105038475.jpg' style='' title='4256273853475260401504121217105038475.jpg'/></p><p></p>",
      isnew : false
  },
  "3" : {
      title :"【设备资料】Operation Manual for Operation & Inspection Station.pdf",
      date : "2017-06-26 09:42:04",
      author :"吴玉洁",
      path : "/home/upload/运行检查/Operation Manual for Operation & Inspection Station.pdf",
      filePath : "运行检查",
      fileSize : "2376k",
      isnew : false
  },
  "4" : {
      title4 :"【知识文库】SIMATIC S7-1200 Step7 Basic V10.5使用介绍",
      date4 : "2017-01-25 08:48:58",
      author4 :"王烁3",
      dept4 : "国内营销服务中心-华东销售服务中心",
      fileName4 : 'S7-1200__Step7_Basic_V10.5.pdf',
      stype4 : '电气控制',
      keywords4 :'PLC、1200、西门子、S7-1200、Step7',
      fileUrl4 : "http://ask.nuctech.com/ueditor/jsp/upload/file/20170122/S7-1200__Step7_Basic_V10.51485073943461071186.pdf",
      isnew4 : false
  }
}

const isSameEffect =(min , max) =>{
  let isSame = false;
  if(min && max){
    const keys = Object.keys(min);
    if(keys.length <= Object.keys(max).length){
      isSame = true;
      keys.map(att => {
        isSame &= max.hasOwnProperty(att) && (min[att] == max[att])
      })
    }
  }
  return isSame;
}

module.exports = {
  config,
  request,
  color,
  classnames,
  queryURL,
  queryArray,
  arrayToTree,
  timeStamp : () => (new Date()).getTime(),
  isEmptyObject : (obj) => Object.keys(obj).length === 0,
  isSameEffect,
  mockGrids,
  getMockData : (index) => mockDatas[index] || {},
  getHotWord :(index) => +index > -1 && hotWords[index] || hotWords,
  getInfoWord : (index) => +index > -1 && infoWords[index] || infoWords,
  getLocalIcon,
}
