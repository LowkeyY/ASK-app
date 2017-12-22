import React from 'react';
import PropTypes from 'prop-types';

import { WhiteSpace, WingBlank, SegmentedControl, List, Radio } from 'antd-mobile';
import { Layout } from 'components';
import styles from './index.less';

const {BaseLine} = Layout,
    RadioItem = Radio.RadioItem,
    PrefixCls = "page-search-user";

function Multiuser({users, selecteds, onSubmit, selectedDatas, selectedIndex, onChange}) {

    const layoutItems = () => {
            const datas = selectedIndex == 0 ? users : selectedDatas;
            return (
                <List>
                  { datas && datas.map(data => layoutItem(data)) }
                </List>
            )
        },
        layoutItem = (data) => {
            switch (selectedIndex) {
            case 0: {
                const checked = selecteds.includes(data.value);
                return (
                    <List.Item onClick={ onSubmit.bind(null, data) }>
                      <RadioItem key={ data.value } checked={ checked }>
                        <span>{ data.text }</span>
                      </RadioItem>
                    </List.Item>
                )
            }
            case 1: {
                const checked = true;
                return (
                    <List.Item onClick={ onSubmit.bind(null, data) }>
                      <RadioItem key={ data.value } checked={ checked }>
                        <span>{ data.text }</span>
                      </RadioItem>
                    </List.Item>
                )
            }
            }
    }
    const navProps = {
        title: "选择用户"
    }
    return (<div>
              <SegmentedControl
                                selectedIndex={ selectedIndex }
                                values={ ['搜索结果', '已选用户'] }
                                onChange={ onChange }
                                style={ { padding: '.2rem' } } />
              <div className={ styles[`${PrefixCls}-search-menu`] }>
                <WingBlank size="sm">
                  <div>
                    { layoutItems() }
                  </div>
                </WingBlank>
                <BaseLine/>
              </div>
            </div>);
}

Multiuser.propTypes = {
    users: PropTypes.array.isRequired,
    selecteds: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    selectedDatas: PropTypes.array.isRequired,
};

export default Multiuser;
