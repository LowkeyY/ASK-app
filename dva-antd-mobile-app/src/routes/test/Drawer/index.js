import { Drawer, List, NavBar , Flex , Radio , Badge , Icon , Button , Accordion} from 'antd-mobile';
import { routerRedux , Link} from 'dva/router';
import { getLocalIcon } from 'utils'
import styles from './index.less'
import Demo from '../components';

const RadioItem = Radio.RadioItem;
const nodes = [
  {value : 0, text:"经验案例" , items : [{
    title : "选择分类",
    key : "selectTypes",
    items:[
      { text : '我的案例', value : 0} ,
      { text : '全部分类', value : 1} ,
      { text : '优秀案例', value : 2} ,
      { text : '安装调试', value : 3} ,
      { text : '故障维修', value : 4} ,
      { text : '维护保养', value : 5} ,
      { text : '改善维修', value : 6} ,
      { text : '自由格式', value : 7}
    ]},{
      title : "排序方式",
      key : "selectSort",
      items :[
        { text : '按上传日期排序', value : 0} ,
        { text : '按评论次数排序', value : 1} ,
        { text : '按预览次数排序', value : 2}
    ]}
  ]},
  {value : 1,text:"交流论坛" , items :[
      {
      title : "排序方式",
      key : "selectSort",
      items :[
        { text : '按上传日期排序', value : 0} ,
        { text : '按评论次数排序', value : 1} ,
        { text : '按预览次数排序', value : 2}
      ]}
  ]},
  {value : 2,text:"设备资料" , items :[
      {
      title : "排序方式",
      key : "selectSort",
      items :[
        { text : '按上传日期排序', value : 0} ,
        { text : '按评论次数排序', value : 1} ,
        { text : '按预览次数排序', value : 2}
      ]}
  ]},
  {value : 3,text:"知识文库" , items :[
      {
      title : "排序方式",
      key : "selectSort",
      items :[
        { text : '按上传日期排序', value : 0} ,
        { text : '按评论次数排序', value : 1} ,
        { text : '按预览次数排序', value : 2}
      ]}
  ]},
  {value : 4 ,text:"热词" , items :[{
    title : "选择热词",
    key : "selectTypes",
    items:[
      { text : '秒速五厘米', value : 0} ,
      { text : '灌篮高手', value : 1} ,
      { text : '七龙珠', value : 2} ,
      { text : '海贼王', value : 3} ,
      { text : '天空之城', value : 4} ,
      { text : '萤火之森', value : 5} ,
      { text : '你的名字', value : 6} ,
      { text : '千与千寻', value : 7}
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
  {value : 5,text:"通知公告" , items :[
      {
      title : "排序方式",
      key : "selectSort",
      items :[
        { text : '按上传日期排序', value : 0} ,
        { text : '按评论次数排序', value : 1} ,
        { text : '按预览次数排序', value : 2}
      ]}
  ]},
]


class App1 extends React.Component {
  state = {
    open: false,
    selectSys : this.props.selectSys,
    selectTypes : 1,
    selectSort : 1
  }
  onOpenChange = (...args) => {
    console.log(args);
    this.setState({ open: !this.state.open });
  }
  onSelectChange = (prop , value)=>{
    const arg = {};
    arg[prop] = value;
    this.setState(arg);
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
    console.log(this.props);
    const sidebar = [] , children = this.getSelectSys().items;
    sidebar.push(
      <List renderHeader={()=>("分系统")} className={styles["my-list"]}>
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
      dispatch : this.props.dispatch
    } , goSearch = ()=>{
      const {dispatch , froms = "/"} = this.props;
      dispatch(routerRedux.push({pathname:"/search" , query : {froms}}))
    }
    return (<div>
      <div className={styles["navbar-fixed"]}>
        <div className={styles["navbar-fixed-left"]}>
            <span style={{color: "#108ee9"}} onClick={this.onOpenChange}>
              <Icon key="1" type={getLocalIcon("/过滤.svg")} />
            </span>
        </div>
        <div className={styles["navbar-fixed-center"]}>
          <Button className={`btn ${styles.search}`} inline size="small" icon="search" onClick = {goSearch}>
            请输入搜索内容
          </Button>
        </div>
        <div className={styles["navbar-fixed-right"]}>
            <Link to={"/creates"}>
              <span style={{color: "#108ee9"}}>
                <Icon key="1" type={getLocalIcon("/发布.svg")} />
              </span>
            </Link>
        </div>
      </div>
      <div style={{marginTop : "1rem"}}>
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
          <List className={styles["my-tag"]}>
            {this.packSelects()}
          </List>
          <Demo {...demoProps}/>
        </Drawer>
      </div>
    </div>);
  }
}

export default App1;
