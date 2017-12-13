import { RefreshControl, ListView , List , Tag ,Icon} from 'antd-mobile';
import ReactDOM from 'react-dom';
import { routerRedux } from 'dva/router';
import { getLocalIcon , getMockData} from 'utils'

const Item = List.Item , Brief = Item.Brief , PrefixCls = "tq-list";
let index = 0;
const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataArr = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
  }
  return dataArr;
}

class Results extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      selectSys : this.props.selectSys,
      refreshing: true,
      height: document.documentElement.clientHeight,
    };
  }

  componentDidMount() {
    // Set the appropriate height
    setTimeout(() => this.setState({
      height: this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop,
    }), 0);

    // handle https://github.com/ant-design/ant-design-mobile/issues/1588
    this.lv.getInnerViewNode().addEventListener('touchstart', this.ts = (e) => {
      this.tsPageY = e.touches[0].pageY;
    });
    this.lv.getInnerViewNode().addEventListener('touchmove', this.tm = (e) => {
      this.tmPageY = e.touches[0].pageY;
      if (this.tmPageY > this.tsPageY && this.st <= 0 && document.body.scrollTop > 0) {
        this.domScroller.options.preventDefaultOnTouchMove = false;
      } else {
        this.domScroller.options.preventDefaultOnTouchMove = undefined;
      }
    });
  }

  componentWillUnmount() {
    this.lv.getInnerViewNode().removeEventListener('touchstart', this.ts);
    this.lv.getInnerViewNode().removeEventListener('touchmove', this.tm);
  }

  onScroll = (e) => {
    this.st = e.scroller.getValues().top;
    this.domScroller = e;
  };

  onRefresh = () => {
    if (!this.manuallyRefresh) {
      this.setState({ refreshing: true });
    } else {
      this.manuallyRefresh = false;
    }

    // simulate initial Ajax
    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        refreshing: false,
      });
    }, 600);
  };

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = [...this.rData, ...genData(++pageIndex)];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  };

  handleItemClick = () =>{
    this.props.dispatch(routerRedux.push({pathname:"/forumdetails"}))
  };

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 5,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    const row = (rowData, sectionID, rowID) => {
        if (index < 0) {
          index = data.length - 1;
        }
        const obj = getMockData(this.props.selectSys);
        return (
          <Item className={`${PrefixCls}-row`}
                arrow="horizontal"
                multipleLine
                onClick={this.handleItemClick}
                key={rowID}
                wrap
          >
            <div className={"title"}><h3>{obj.title + rowID}</h3></div>
            <Brief>{`${obj.author} - (${obj.date})`}</Brief>
            <div className={"content"}>
              <div>
                <Icon type="info-circle" size="xs" />
                <span>{`${obj.views || "0"} / ${obj.replys || "0"}`}</span>
              </div>
              <div>
                <Icon type={getLocalIcon("/page/板块.svg")} size="xs" />
                <span>{`${obj.plates || "其它"}`}</span>
              </div>
              <div>
                <Icon type={getLocalIcon("/page/状态.svg")} size="xs" />
                <span>{`${obj.status || "其它"}`}</span>
              </div>
            </div>
          </Item>
        );
    };
    return (
      <ListView ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: '0.3rem', textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '加载完毕'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        initialListSize={5}
        pageSize={5}
        style={{
          height: this.state.height,
          border: '1px solid #ddd',
          margin: '0.1rem 0',
        }}
        scrollerOptions={{ scrollbars: true }}
        refreshControl={<RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />}
        onScroll={this.onScroll}
        scrollRenderAheadDistance={200}
        scrollEventThrottle={20}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}

export default Results;