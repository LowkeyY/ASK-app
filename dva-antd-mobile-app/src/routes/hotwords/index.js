
import React from 'react';
import { Icon } from 'antd-mobile';
import { connect } from 'dva';
import Hottag from './component/hottag'
import styles from './index.less'
import { getLocalIcon } from 'utils'
const PrefixCls = 'hotwords';
class HotWords extends React.Component {
    constructor() {
        super();
        this.state = {
            enter: true,
        };
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }
    toggleDropdown() {
        this.setState({
            enter: !this.state.enter,
        });
    }
    render() {
        const {hotwords, ...props} = this.props,
            length = hotwords.length,
            icon = '/page/' + (this.state.enter ? 'dropdown.svg' : 'dropup.svg'),
            isShowEnd = this.state.enter ? 'none' : '',
            isShowBtn = length > 7 ? '' : 'none',
            isShowSecond = length > 3 ? '' : 'none';

        return (
            <div className={ styles[`${PrefixCls}-container`] }>
              <div className={ styles[`${PrefixCls}-container-head`] }>
                <span className={ styles[`${PrefixCls}-container-head-logo`] }>热词</span>
                { hotwords.slice(0, 3).map((_,i) => <Hottag key={i} {..._} {...props} />) }
                <div style={ { display: isShowBtn } } onClick={ this.toggleDropdown } className={ styles[`${PrefixCls}-dropdownBtn`] }>
                  <Icon type={ getLocalIcon(icon) } size="xs" />
                </div>
              </div>
              <div style={ { display: isShowSecond } } className={ styles[`${PrefixCls}-container-second`] }>
                { hotwords.slice(3, 7).map((_,i) => <Hottag key={i} {..._} {...props} />) }
              </div>
              <div style={ { display: isShowEnd } } className={ styles[`${PrefixCls}-container-end`] }>
                { hotwords.slice(7).map((_,i) => <Hottag key={i} {..._} {...props} />) }
              </div>
            </div>
            );
    }
}
export default connect(({HotWords, loading}) => ({
    HotWords,
    loading
}))(HotWords);
