import { Drawer, List, NavBar , Flex , Radio , Badge , Icon , Button , Accordion} from 'antd-mobile';
import { routerRedux , Link} from 'dva/router';
import { getLocalIcon } from 'utils'
import Caselist from './caseinfo';
import Bbsxlist from './bbsxinfo';
import Equipmentlist from './equipmentinfo';
import Hotlist from './hotinfo';
import Lorelist from './loreinfo';
import Notelist from './noteinfo';
import styles from './index.less';
import './list.less';
import {Filterview , Headersearch} from 'components/Layout';



const RadioItem = Radio.RadioItem;
const nodes = [
  {value : 1,text:"交流论坛" , items :[ 
      {
        title :"版块",
        key : "selectTypes",
        items : [
          {text : '全部版块', value : '1'} ,
          {value:'19',text:'加速器'},
          {value:'2',text:'探测器'},
          {value:'3',text:'扫描控制'},
          {value:'4',text:'扫描装置'},
          {value:'6',text:'软件'},
          {value:'8',text:'综合'},
          {value:'9',text:'其它'},
          {value:'11',text:'图像获取'},
          {value:'12',text:'辐射防护'},
          {value:'13',text:'土建'},
          {value:'14',text:'故障直通车'},
          {value:'15',text:'产品小贴士'},
          {value:'16',text:'保养百问'},
          {value:'18',text:'算法'}
        ]
      },{
      title : "状态",
      key : "selectSort",
      items :[
        { text : '全部', value : 0} ,
        { text : '讨论中', value : '1'} ,
        { text : '已解决', value : '2'}
      ]}
  ]},
  {value : 2, text:"经验案例" , items : [{
    title : "所属类型",
    key : "selectTypes",
    items:[
      { text : '全部分类', value : '1'} ,
      { text : '优秀案例', value : '2'} ,
      {value:'146',text:'安装调试'},
      {value:'147',text:'故障维修'},
      {value:'148',text:'维护保养'},
      {value:'149',text:'改善维修'},
      {value:'150',text:'自由格式'}
    ]},{
      title : "排序方式",
      key : "selectSort",
      items :[
        { text : '按上传日期排序', value : 0} ,
        { text : '按评论次数排序', value : 1} ,
        { text : '按预览次数排序', value : 2}
    ]}
  ]},
  {value : 3,text:"设备资料" , items :[
      {
      title : "排序方式",
      key : "selectSort",
      items :[
        { text : '按上传日期排序', value : 0} ,
        { text : '按评论次数排序', value : 1} ,
        { text : '按预览次数排序', value : 2}
      ]}
  ]},
  {value : 4,text:"知识文库" , items :[{
    title : "文档类型",
    key : "selectTypes",
    items: [
      { value: '1', text: '全部分类' },
      { value: '154', text: '机械液压' },
      { value: '155', text: '电子技术' },
      { value: '156', text: '电气控制' },
      { value: '217', text: '计算机' },
      { value: '218', text: '加速器' },
      { value: '219', text: '工具仪表' },
      { value: '220', text: '技能技巧' }
    ]},
      {
      title : "排序方式",
      key : "selectSort",
      items :[
        { text : '按上传日期排序', value : 0} ,
        { text : '按评论次数排序', value : 1} ,
        { text : '按预览次数排序', value : 2}
      ]}
  ]},
  {value : 5 ,text:"热词" , items :[{
    title : "选择热词",
    key : "selectTypes",
    items:[
      { text : '秒速五厘米', value : '1'} ,
      { text : '灌篮高手', value : 8} ,
      { text : '七龙珠', value : 2} ,
      { text : '海贼王', value : 3} ,
      { text : '天空之城', value : 4} ,
      { text : '萤火之森', value : 5} ,
      { text : '你的名字', value : 6} ,
      { text : '千与千寻', value : 7}
    ]},
    {
      title : "版块分类",
      key : "selectSort",
      items :[
        { text : '全部内容', value : 0} ,
        { text : '交流论坛', value : 4} ,
        { text : '经验案例', value : 1} ,
        { text : '知识文库', value : 2} ,
        { text : '设备资料', value : 3} ,
    ]}
  ]},
  {value : 6,text:"通知公告" , items :[
      {
      title : "排序方式",
      key : "selectSort",
      items :[
        { text : '按上传日期排序', value : 0}
      ]}
  ]},
]


class App1 extends React.Component {
  state = {
    open: false,
    selectSys : this.props.selectSys,
    selectTypes : '1',
    selectSort : 0
  }
  onOpenChange = (...args) => {
    this.setState({ open: !this.state.open });
  }
  onSelectChange = (prop , value)=>{
    const arg = {};
    arg[prop] = value;
    this.setState(arg);
    this.props.updateState(arg);
  }

  packChildren = (datas , types) => {
    return (
      <Flex>
        {datas && datas.map((i ,index) => {
          return (
            <Flex.Item onClick = {this.onSelectChange.bind(null , types , i.value)}>
              <RadioItem key={i.value} checked={this.state[types] === i.value}>
                <span>{i.text}</span>
              </RadioItem>
            </Flex.Item>
          )
        })}
      </Flex>
    )
  }

  packItems = (items , types) =>{
    let datas = [];
    return items.map((i, index) => {
      datas.push(i);
      if(datas.length === 2){
        const newDatas = datas.concat();
        datas.length = 0;
        return this.packChildren(newDatas , types);
      } else if(index === items.length - 1){
        return this.packChildren(datas , types);
      }
    })
  }

  getSelectSys = () => (
    nodes.find( _ => (_.value === this.state.selectSys))
  )

  getAllSelects = () =>{
      const children = this.getSelectSys() , values = [children.text];
      children.items.map(items => {
        const key = items.key;
        items.items.map(_ => {
          if(_.value === this.state[key])
            values.push(_.text)
        })
      })
      return values;
  }

  packSelects = ()=>{
    const children = this.getSelectSys() , badgeStyles = {
      marginLeft: 12,
      padding: '0 0.15rem',
      backgroundColor: '#fff',
      borderRadius: 2,
      color: '#1284d6',
      border: '1px solid #108ee9',
      zIndex : 0,
    } ,selects = [
      (
        <Badge text={children.text} style={badgeStyles}/>
      )
    ];

    children.items.map(items => {
      const key = items.key;
      items.items.map(_ => {
        if(_.value === this.state[key])
          selects.push(
            <Badge text={_.text} style={badgeStyles}/>
          )
      })
    })
    return selects;
  }

  render() {
    const sidebar = [] , children = this.getSelectSys().items;
    sidebar.push(
      <List renderHeader={()=>("所有模块")} className={styles["my-list"]}>
        {this.packItems(nodes , "selectSys")}
      </List>);
    if(children.length){
        children.map((child , index) => {
          sidebar.push(
            <List renderHeader={()=>(child.title)}  className={styles["my-list"]}>
              {this.packItems(child.items , child.key)}
            </List>);
        })
    }
    const demoProps = {
      dispatch : this.props.dispatch,
      selectSys : this.state.selectSys,
    } , goSearch = ()=>{
      const {dispatch , froms = "/"} = this.props;
      dispatch(routerRedux.push({pathname:"/search" , query : {froms}}))
    } , getTypeList = ()=>{
      switch(this.state.selectSys){
        case 1 : 
          return <Bbsxlist {...demoProps}/>;
        case 2 :
          return <Caselist {...demoProps}/>;
        case 3 : 
          return <Equipmentlist {...demoProps}/>;
        case 4 :
          return <Lorelist {...demoProps}/>;
        case 5 : 
          return <Hotlist {...demoProps}/>;
        case 6 :
          return <Notelist {...demoProps}/>;
      }
      return "";
    }
    const headerProps = {
      dispatch : this.props.dispatch,
      leftContent :{
        icon : "/header/filter.svg",
        onClick : this.onOpenChange.bind(this),
      },
      rightContent :{
        to : '/creates',
        icon : '/header/add.svg',
      }
    }
    return (<div>
      <Headersearch {...headerProps}/>
      <div style={{marginTop : "1rem"}}>
        <Filterview values={this.getAllSelects()}/>
        <Drawer
          className={styles["my-drawer"]}
          style={{ height: document.documentElement.clientHeight - 100}}
          enableDragHandle
          contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 0 }}
          sidebar={sidebar}
          sidebarStyle = {{width : "85%" , backgroundColor:'white'}}
          dragHandleStyle = {{width : 0}}
          open={this.state.open}
          onOpenChange={this.onOpenChange}
        >
          {getTypeList()}
        </Drawer>
      </div>
    </div>);
  }
}

export default App1;
