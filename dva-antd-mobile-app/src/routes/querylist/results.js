import { RefreshControl, ListView } from 'antd-mobile';
import ReactDOM from 'react-dom';

class Results extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            height: document.documentElement.clientHeight - 140,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            if (ReactDOM.findDOMNode(this.lv)) {
                const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop - 140;
                this.setState({
                    height: hei,
                })
            }
        }, 0);

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
        if (this.props.scrollerTop > 0)
            this.lv.scrollTo(0, this.props.scrollerTop);
    }

    componentWillUnmount() {
        this.lv.getInnerViewNode().removeEventListener('touchstart', this.ts);
        this.lv.getInnerViewNode().removeEventListener('touchmove', this.tm);
        if (this.st && this.st !== 0)
            this.props.updateScrollerTop(this.st);
    }

    onScroll = (e) => {
        this.st = e.scroller.getValues().top;
        this.domScroller = e;
    };

    render() {
        const separator = (sectionID, rowID) => (
            <div key={ `${sectionID}-${rowID}` } style={ { backgroundColor: '#F5F5F9', height: 2, borderTop: '1px solid #ECECED', borderBottom: '1px solid #ECECED', } } />
        );

        const footer = () => {
            const isLoad = this.props.isLoading || this.props.refreshing;
            return (
                <div style={ { padding: isLoad ? '20px' : '30px', textAlign: 'center' } }>
                  { isLoad ? '加载中...' : '没有更多内容了。' }
                </div>
            )
        }
        return (
            <ListView
                      ref={ el => this.lv = el }
                      dataSource={ this.props.dataSource }
                      renderFooter={ footer }
                      renderRow={ this.props.renderRow }
                      renderSeparator={ separator }
                      initialListSize={ this.props.initialListSize || 10 }
                      pageSize={ 10 }
                      style={ { height: this.state.height, border: '1px solid #ddd', margin: '0.1rem 0', } }
                      scrollerOptions={ { scrollbars: true } }
                      refreshControl={ <RefreshControl refreshing={ this.props.refreshing } onRefresh={ this.props.onRefresh } /> }
                      onScroll={ this.onScroll }
                      scrollRenderAheadDistance={ 200 }
                      scrollEventThrottle={ 20 }
                      onEndReached={ this.props.onEndReached }
                      onEndReachedThreshold={ 10 } />
            );
    }
}

export default Results;