const BASE_URL = "http://img.baidu.com/hi/"
import styles from './index.less'

const emotion = {
  tabNum: 7, //切换面板数量
  SmilmgName: {
    tab0: ['j_00', 84],
    tab1: ['t_00', 40],
    tab2: ['w_00', 52],
    tab3: ['B_00', 63],
    tab4: ['C_00', 20],
    tab5: ['i_f', 50],
    tab6: ['y_00', 40]
  }, //图片前缀名
  imageFolders: {
    tab0: 'jx2/',
    tab1: 'tsj/',
    tab2: 'ldw/',
    tab3: 'bobo/',
    tab4: 'babycat/',
    tab5: 'face/',
    tab6: 'youa/'
  }, //图片对应文件夹路径
  imageCss: {tab0: 'jd', tab1: 'tsj', tab2: 'ldw', tab3: 'bb', tab4: 'cat', tab5: 'pp', tab6: 'youa'}, //图片css类名
  imageCssOffset: {tab0: 35, tab1: 35, tab2: 35, tab3: 35, tab4: 35, tab5: 25, tab6: 35}, //图片偏移
  SmileyInfor: {
    tab0: ['Kiss', 'Love', 'Yeah', '啊！', '背扭', '顶', '抖胸', '88', '汗', '瞌睡', '鲁拉', '拍砖', '揉脸', '生日快乐', '大笑', '瀑布汗~', '惊讶', '臭美', '傻笑', '抛媚眼', '发怒', '打酱油', '俯卧撑', '气愤', '?', '吻', '怒', '胜利', 'HI', 'KISS', '不说', '不要', '扯花', '大心', '顶', '大惊', '飞吻', '鬼脸', '害羞', '口水', '狂哭', '来', '发财了', '吃西瓜', '套牢', '害羞', '庆祝', '我来了', '敲打', '晕了', '胜利', '臭美', '被打了', '贪吃', '迎接', '酷', '微笑', '亲吻', '调皮', '惊恐', '耍酷', '发火', '害羞', '汗水', '大哭', '', '加油', '困', '你NB', '晕倒', '开心', '偷笑', '大哭', '滴汗', '叹气', '超赞', '??', '飞吻', '天使', '撒花', '生气', '被砸', '吓傻', '随意吐'],
    tab1: ['Kiss', 'Love', 'Yeah', '啊！', '背扭', '顶', '抖胸', '88', '汗', '瞌睡', '鲁拉', '拍砖', '揉脸', '生日快乐', '摊手', '睡觉', '瘫坐', '无聊', '星星闪', '旋转', '也不行', '郁闷', '正Music', '抓墙', '撞墙至死', '歪头', '戳眼', '飘过', '互相拍砖', '砍死你', '扔桌子', '少林寺', '什么？', '转头', '我爱牛奶', '我踢', '摇晃', '晕厥', '在笼子里', '震荡'],
    tab2: ['大笑', '瀑布汗~', '惊讶', '臭美', '傻笑', '抛媚眼', '发怒', '我错了', 'money', '气愤', '挑逗', '吻', '怒', '胜利', '委屈', '受伤', '说啥呢？', '闭嘴', '不', '逗你玩儿', '飞吻', '眩晕', '魔法', '我来了', '睡了', '我打', '闭嘴', '打', '打晕了', '刷牙', '爆揍', '炸弹', '倒立', '刮胡子', '邪恶的笑', '不要不要', '爱恋中', '放大仔细看', '偷窥', '超高兴', '晕', '松口气', '我跑', '享受', '修养', '哭', '汗', '啊~', '热烈欢迎', '打酱油', '俯卧撑', '?'],
    tab3: ['HI', 'KISS', '不说', '不要', '扯花', '大心', '顶', '大惊', '飞吻', '鬼脸', '害羞', '口水', '狂哭', '来', '泪眼', '流泪', '生气', '吐舌', '喜欢', '旋转', '再见', '抓狂', '汗', '鄙视', '拜', '吐血', '嘘', '打人', '蹦跳', '变脸', '扯肉', '吃To', '吃花', '吹泡泡糖', '大变身', '飞天舞', '回眸', '可怜', '猛抽', '泡泡', '苹果', '亲', '', '骚舞', '烧香', '睡', '套娃娃', '捅捅', '舞倒', '西红柿', '爱慕', '摇', '摇摆', '杂耍', '招财', '被殴', '被球闷', '大惊', '理想', '欧打', '呕吐', '碎', '吐痰'],
    tab4: ['发财了', '吃西瓜', '套牢', '害羞', '庆祝', '我来了', '敲打', '晕了', '胜利', '臭美', '被打了', '贪吃', '迎接', '酷', '顶', '幸运', '爱心', '躲', '送花', '选择'],
    tab5: ['微笑', '亲吻', '调皮', '惊讶', '耍酷', '发火', '害羞', '汗水', '大哭', '得意', '鄙视', '困', '夸奖', '晕倒', '疑问', '媒婆', '狂吐', '青蛙', '发愁', '亲吻', '痴呆', '爱心', '心碎', '玫瑰', '礼物', '哭', '奸笑', '可爱', '得意', '呲牙', '暴汗', '楚楚可怜', '困', '哭', '生气', '惊讶', '口水', '彩虹', '夜空', '太阳', '钱钱', '灯泡', '咖啡', '蛋糕', '音乐', '胜利', '赞', '鄙视', 'OK'],
    tab6: ['男兜', '女兜', '开心', '乖乖', '偷笑', '大笑', '抽泣', '大哭', '无奈', '滴汗', '叹气', '狂晕', '委屈', '超赞', '??', '疑问', '飞吻', '天使', '撒花', '生气', '被砸', '口水', '泪奔', '吓傻', '吐舌头', '点头', '随意吐', '旋转', '困困', '鄙视', '狂顶', '篮球', '再见', '欢迎光临', '恭喜发财', '稍等', '我在线', '恕不议价', '库房有货', '货在路上']
  }
};
const EmojiBox = (props) => {
// http://img.baidu.com/hi/face/i_f13.gif
  const arr = emotion.SmileyInfor.tab5
  const SmilmgName = emotion.SmilmgName.tab5[0]
  const emojiCodes=[
    {title:'微笑',id:'01',code:'D83D,DE03'},
    {title:'亲吻',id:'02',code:'D83D,DE18'},
    {title:'调皮',id:'03',code:'D83D,DE1C'},
    {title:'惊讶',id:'04',code:'D83D,DE31'},
    {title:'耍酷',id:'05',code:'D83D,DE0E'},
    {title:'发火',id:'06',code:'D83D,DE20'},
    {title:'害羞',id:'07',code:'D83D,DE33'},
    {title:'汗水',id:'08',code:'D83D,DE13'},
    {title:'大哭',id:'09',code:'D83D,DE2D'},
    {title:'得意',id:'10',code:'D83D,DE09'},
    {title:'鄙视',id:'11',code:'D83D,DC4E'},
    {title:'困',id:'12',code:'D83D,DE34'},
    {title:'夸奖',id:'13',code:'D83D,DC4D'},
    {title:'晕倒',id:'14',code:'D83D,DE35'},
    {title:'疑问',id:'15',code:'D83D,DE36'},
    {title:'媒婆',id:'16',code:'D83D,DE08'},
    {title:'狂吐',id:'17',code:'D83D,DE37'},
    {title:'青蛙',id:'18',code:'D83D,DC38'},
    {title:'发愁',id:'19',code:'D83D,DE2A'},
    {title:'亲吻',id:'20',code:'D83D,DE19'},
    {title:'痴呆',id:'21',code:'D83D,DE2F'},
    {title:'爱心',id:'22',code:'D83D,DC96'},
    {title:'心碎',id:'23',code:'D83D,DC94'},
    {title:'玫瑰',id:'24',code:'D83C,DF39'},
    {title:'礼物',id:'25',code:'D83C,DF81'},
    {title:'哭',id:'26',code:'D83D,DE02'},
    {title:'奸笑',id:'27',code:'D83D,DE00'},
    {title:'可爱',id:'28',code:'D83D,DE0A'},
    {title:'得意',id:'29',code:'D83D,DE0F'},
    {title:'呲牙',id:'30',code:'D83D,DE01'},
    {title:'暴汗',id:'31',code:'D83D,DE13'},
    {title:'楚楚可怜',id:'32',code:'D83D,DE2B'},
    {title:'困',id:'33',code:'D83D,DE34'},
    // {title:'哭',id:'34',code:'D83D,DE02'},
    {title:'生气',id:'35',code:'D83D,DE21'},
    {title:'惊讶',id:'36',code:'D83D,DE31'},
    {title:'口水',id:'37',code:'D83D,DE0B'},
    {title:'彩虹',id:'38',code:'D83C,DF08'},
    {title:'夜空',id:'39',code:'D83C,DF19'},
    {title:'太阳',id:'40',code:'D83C,DF1E'},
    {title:'钱钱',id:'41',code:'D83D,DCB0'},
    {title:'灯泡',id:'42',code:'D83D,DCA1'},
    {title:'咖啡',id:'43',code:'D83C,DF75'},
    {title:'蛋糕',id:'44',code:'D83C,DF82'},
    {title:'音乐',id:'45',code:'D83C,DFB5'},
    {title:'胜利',id:'47',code:'270C'},
    {title:'赞',id:'48',code:'D83D,DC4D'},
    {title:'鄙视',id:'49',code:'D83D,DC4E'},
    {title:'OK',id:'50',code:'D83D,DC4C'},
  ]
  const getEmojiCode = (index)=> emojiCodes[(index > emojiCodes.length || index < 0) ? 0 : index]
  return (
    <div className={styles['RichEditor-emjoy-box']} style={{display: props.isShowEmojiBox ? "block" : 'none',height:cnkeyboardHeight?`${cnkeyboardHeight}px`:'3rem'}}>
      <ul>
        {
          emojiCodes.map((emojiCodes, i) => {
            return <li
              key={i.id}
              onClick={props.insertEmoji.bind(null,`${BASE_URL}face/${SmilmgName}${emojiCodes.id}.gif`, emojiCodes.title ,emojiCodes.code )}>
              <img src={`${BASE_URL}face/${SmilmgName}${emojiCodes.id}.gif`}/></li>
          })
        }
      </ul>
    </div>
  )
}
export default EmojiBox
