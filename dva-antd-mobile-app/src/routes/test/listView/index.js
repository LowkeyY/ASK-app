/* eslint no-dupe-keys: 0 */
import { ListView , List} from 'antd-mobile';
import { routerRedux } from 'dva/router';
import styles from './index.less';
const Item = List.Item , Brief = Item.Brief;
const data = [
  {
    name : '共享手机现身昆明:年租金近4000元不如直接买一台',
    date : '2017年09月10日',
    author : '网易科技',
  }
];
let index = data.length - 1;

const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.dataBlob = {};
    this.sectionIDs = [];
    this.rowIDs = [];
    this.genData = (pIndex = 0) => {
      for (let i = 0; i < NUM_SECTIONS; i++) {
        const ii = (pIndex * NUM_SECTIONS) + i;
        const sectionName = `Section ${ii}`;
        this.sectionIDs.push(sectionName);
        this.dataBlob[sectionName] = sectionName;
        this.rowIDs[ii] = [];

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
          const rowName = `S${ii}, R${jj}`;
          this.rowIDs[ii].push(rowName);
          this.dataBlob[rowName] = rowName;
        }
      }
      // new object ref
      this.sectionIDs = [].concat(this.sectionIDs);
      this.rowIDs = [].concat(this.rowIDs);
    };

    this.state = {
      dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
      isLoading: true,
    };
  }

  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.refs.lv.refs.listview.scrollTo(0, 200), 800); // also work
    // setTimeout(() => this.refs.lv.scrollTo(0, 200), 800); // recommend usage

    // simulate initial Ajax
    setTimeout(() => {
      this.genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
        isLoading: false,
      });
    }, 600);
  }
  handleItemClick = () =>{
    this.props.dispatch(routerRedux.push({pathname:"/pagecontent" , query : {froms : this.props.froms}}))
  };
  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
  //     });
  //   }
  // }

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.genData(++pageIndex);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 0,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
		  <Item
          className={styles["row-title"]}
          arrow="horizontal"
          multipleLine
          onClick={this.handleItemClick}
          key={rowID}
        >
          <span>{obj.name}</span>
        </Item>
      );
    };

    return (
      <ListView ref="lv"
        dataSource={this.state.dataSource}
        renderHeader={() => <span>header</span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '加载完毕'}
        </div>)}
        renderSectionHeader={sectionData => (
          <div>{`第 ${sectionData.split(' ')[1]}页`}</div>
        )}
        renderRow={row}
        renderSeparator={""}
        className="am-list"
        pageSize={10}
        onScroll={() => { console.log('scroll'); }}
        scrollEventThrottle={200}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
        stickyHeader
        stickyProps={{
          stickyStyle: {zIndex: 999, WebkitTransform: 'none', transform: 'none' },
          // topOffset: -43,
          // isActive: false,
        }}
        stickyContainerProps={{
          className: 'for-stickyContainer-demo',
        }}
      />
    );
  }
}

export default Demo