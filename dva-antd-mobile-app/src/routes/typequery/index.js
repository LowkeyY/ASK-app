import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Filterview, Headersearch } from 'components/Layout';
import { Drawer, List, NavBar, Flex, Radio, Badge, Icon, Button, Accordion } from 'antd-mobile';
import { isSameEffect } from 'utils'
import QueryList from '../querylist'
import './index.less';

let startIndex = 1;
const getKeyIndex = (tag) => (`${tag || "id-"}-${startIndex++}`);
const RadioItem = Radio.RadioItem;

function Typequery({typequery, loading, dispatch}) {
    const PrefixCls = "typequery",
        {defaultSelected, filterSelected, preFilterSelected, modules, moduleMenu, menuOpened, primaryTag} = typequery;

    const currentModule = modules.find(_ => (_.value == filterSelected[primaryTag])),
        currentMenus = currentModule && moduleMenu[filterSelected[primaryTag]] || [];

    const updateState = (payload) => {
            dispatch({
                type: "typequery/updateState",
                payload
            });
        },
        selectChange = (key, value) => {
            filterSelected[key] = value;
            updateState({
                filterSelected: {
                    ...defaultSelected[filterSelected[primaryTag]],
                    ...filterSelected
                }
            });
        };

    const getSelectTexts = () => {
        const values = [];
        if (currentMenus.length) {
            values.push(currentModule.text);
            currentMenus.map(items => {
                const key = items.key;
                items.items.map(_ => {
                    if (_.value == filterSelected[key])
                        values.push(_.text)
                })
            })
        }
        return values;
    }

    const packChildren = (datas, types) => {
            return (
                <Flex key={ getKeyIndex("flex") }>
                  { datas && datas.map((i, index) => {
                        return (
                            <Flex.Item key={ getKeyIndex("flex-item") } onClick={ selectChange.bind(null, types, i.value) }>
                              <RadioItem key={ i.value } checked={ i.value == filterSelected[types] }>
                                <span>{ i.text }</span>
                              </RadioItem>
                            </Flex.Item>
                        )
                    }) }
                </Flex>
            )
        },
        packItems = (items, types) => {
            let datas = [];
            return items.map((i, index) => {
                datas.push(i);
                if (datas.length === 2) {
                    const newDatas = datas.concat();
                    datas.length = 0;
                    return packChildren(newDatas, types);
                } else if (index === items.length - 1) {
                    return packChildren(datas, types);
                }
            })
    }

    const headerProps = {
        dispatch,
        leftContent: {
            icon: "/header/filter.svg",
            onClick: updateState.bind(null, {
                menuOpened: !menuOpened,
                preFilterSelected: !menuOpened ? Object.assign({}, filterSelected) : {}
            }),
        },
        rightContent: {
            to: '/creates',
            icon: '/header/add.svg',
        }
    }

    const getSidebars = () => {
            const values = [];
            if (currentMenus.length) {
                values.push(
                    <List renderHeader={ () => ("选择模块") }>
                      { packItems(modules, primaryTag) }
                    </List>);
                if (currentMenus.length) {
                    currentMenus.map((child, index) => {
                        values.push(
                            <List renderHeader={ () => (child.title) }>
                              { packItems(child.items, child.key) }
                            </List>);
                    })
                }
                return <div className="filter-list">
                         { values }
                       </div>
            }
            return "";
        },
        onOpenChange = (open) => {
            //参数改变时，开启分类检索页面刷新。
            updateState({
                menuOpened: open,
                refreshing: !isSameEffect(preFilterSelected, filterSelected),
                preFilterSelected: {}
            });
    }

    return (
        <div>
          <Headersearch {...headerProps}/>
          <div className={ `${PrefixCls}-body` }>
            <Filterview values={ getSelectTexts() } />
            <Drawer
                    className={ "my-drawer" }
                    style={ { height: document.documentElement.clientHeight - 90 } }
                    enableDragHandle
                    contentStyle={ { color: '#A6A6A6', textAlign: 'center', paddingTop: 0 } }
                    sidebar={ getSidebars() }
                    sidebarStyle={ { width: "85%", backgroundColor: 'white' } }
                    dragHandleStyle={ { width: 0 } }
                    open={ menuOpened }
                    onOpenChange={ onOpenChange }>
              <QueryList/>
            </Drawer>
          </div>
        </div>
    )
}

Typequery.propTypes = {
    test: PropTypes.object,
    loading: PropTypes.object,
};
export default connect(({typequery, loading}) => ({
    typequery,
    loading
}))(Typequery)
