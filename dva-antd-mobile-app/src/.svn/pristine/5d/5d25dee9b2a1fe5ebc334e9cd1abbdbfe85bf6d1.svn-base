import React from 'react';
import PropTypes from 'prop-types';
import { WingBlank, List, Radio } from 'antd-mobile';
import { Layout } from 'components'
import styles from './index.less';

const {BaseLine} = Layout,
    RadioItem = Radio.RadioItem,
    PrefixCls = "page-search-user";

function Singleuser({users, selecteds, onSubmit}) {

    const layoutItems = () => {
            return (
                <List>
                  { users && users.map(data => layoutItem(data)) }
                </List>
            )
        },
        layoutItem = (data) => {
            const checked = selecteds.includes(data.value);
            return (
                <List.Item onClick={ onSubmit.bind(null, data) }>
                  <RadioItem key={ data.value } checked={ checked }>
                    <span>{ data.text }</span>
                  </RadioItem>
                </List.Item>
            )
        };

    return (
        <div className={ styles[`${PrefixCls}-search-menu`] }>
          <WingBlank size="sm">
            <div>
              { layoutItems() }
            </div>
          </WingBlank>
          <BaseLine/>
        </div>);

}
Singleuser.propTypes = {
    users: PropTypes.array.isRequired,
    selecteds: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
};
export default Singleuser;