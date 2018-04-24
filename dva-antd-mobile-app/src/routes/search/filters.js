import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { WhiteSpace, WingBlank, Flex, Radio, List, SearchBar, Icon, DatePicker } from 'antd-mobile';
import moment from 'moment';
import 'moment/locale/zh-cn';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import { getLocalIcon } from 'utils'
import './index.less';
import SelectMenu from 'components/selectmenu';

const RadioItem = Radio.RadioItem;
const PrefixCls = "page-search";

function Filters(filters) {
    const {modules, moduleMenu, textQuery, currentModuleId, currentFilter, filterProps, update, getStartDate, getEndDate, resetDate, updateState, onSubmit, goBack, resetResult, searchUser} = filters,
        {currentKey, currentValue, currentItems, refs, isShow, defaultFocus, startDate, endDate} = filterProps;

    const CustomChildren = props => { //DatePicker
        return <div onClick={ props.onClick } style={ { backgroundColor: '#fff', height: '0.9rem', lineHeight: '0.9rem', padding: '0 0.3rem' } }>
                 { props.children }
                 <span style={ { float: 'right', color: '#108ee9' } }>{ props.extra } { /*<Icon size="xs" style={{verticalAlign: 'middle', marginLeft: '10px'}}*/ } { /*type={getLocalIcon("/page/delete.svg")}*/ } { /*onClick={resetDate}*/ } { /*/>*/ }</span>
               </div>
    };
    const handleModuleClick = (currentModuleId) => {
            //更改选择模块以后，清空所选参数, 关闭已打开选项卡；
            updateState({
                currentModuleId,
                currentFilter: {},
                filterProps: {
                    ...filterProps,
                    isShow: false,
                    defaultFocus: true
                }
            })
        },
        handleDatepickerClick = () => {
            updateState({
                filterProps: {
                    ...filterProps,
                    defaultFocus: false
                }
            })
        },
        handleFilterClick = (key, currentItems,e) => {
              e.stopPropagation()
             update({
               isShow: currentKey != key ? true : !isShow,
               currentKey: key,
               currentItems
             })
        },

        handleDateClick = (key, value) => {
            update({
                currentKey: key,
                value
            })
        },

        resetValue = (key, e) => {
            e.stopPropagation();
            delete currentValue[key]
            update({
                currentValue
            })
            delete currentFilter[key]
            updateState({
                currentFilter
            })
        },

        hideSelectMenu = () => {
            update({
                isShow: false
            })
        },
        handleSearchUser = (key) => {
            searchUser(key);
        };

    const layoutModules = () => {
            let datas = [];
            return modules && modules.map((i, index) => {
                    datas.push(i);
                    if (datas.length === 3) {
                        const newDatas = datas.concat();
                        datas.length = 0;
                        return layoutModule(newDatas);
                    } else if (index === modules.length - 1) {
                        return layoutModule(datas);
                    }
                })
        },
        layoutModule = (datas) => {
            return (
                <Flex>
                  { datas && datas.map((i, index) => {
                        const checked = i.value == currentModuleId;
                        return (
                            <Flex.Item className={ `${checked ? "active" : ""}` } onClick={ () => {
                                                                                        handleModuleClick(i.value)
                                                                                    } }>
                              <RadioItem key={ i.value } checked={ checked }>
                                <span>{ i.text }</span>
                              </RadioItem>
                            </Flex.Item>
                        )
                    }) }
                </Flex>
            )
        };

    const layoutFilters = () => {
            const items = moduleMenu[currentModuleId];
            return items && items.map((item, index) => {
                    return layoutFilter(item);
                });
        },
        layoutFilter = (item) => {
            const {key, cntype = "", title, items = []} = item;
            if (!cntype && items.length) {
                if (!currentValue[key]) {
                    currentValue[key] = items[0]
                    update({
                        currentValue
                    })
                }
                return (
                    <List.Item onClick={ handleFilterClick.bind(null, key, items) }
                      arrow={ isShow && currentKey == key ? "up" : "down" }
                      extra={ getFilterValue(key, title) }
                      ref={ el => refs[key] = el }>
                      { title }
                    </List.Item>
                )
            } else {
                if (cntype == "selectuser")
                    return (
                        <List.Item onClick={ handleSearchUser.bind(null, key) } arrow="horizontal" extra={ getFilterValue(key, title) }>
                          { title }
                        </List.Item>
                ) //cntype == "date" 时间框
                else if (cntype == 'date') {
                    const dateChange = (key, value) => {
                        const v = value.format("YYYY-MM-DD");
                        currentValue[key] = [v];
                        update({
                            currentValue
                        })
                        currentFilter[key] = v;
                        updateState({
                            currentFilter
                        })
                    }
                    return (
                        <div>
                          <div className={ `${PrefixCls}-date-picker-line` } onClick={ handleDatepickerClick }>
                            <DatePicker mode="date"
                              title={ title }
                              extra={ getFilterValue(key, title) }
                              onChange={ dateChange.bind(null, key) }>
                              <CustomChildren>
                                { title }
                              </CustomChildren>
                            </DatePicker>
                          </div>
                        </div>
                    )
                }
            }
        },
        getFilterItemValue = (item) => {
            if (Array.isArray(item) && item.length)
                item = item[0];
            if (typeof (item) === 'object')
                return item.text || item.label || "";
            return item;
        },
        getFilterValue = (key, title) => {
            const curValue = currentValue[key];
            let newValue = "";
            if (curValue)
                newValue = getFilterItemValue(curValue);
            return newValue === "" ? `选择${title}(全部)` :
                newValue.startsWith("全部") ? newValue :
                    <span>{ newValue } <Icon size="xs"
                                                    style={ { verticalAlign: 'middle', margin: '0 10px' } }
                                                    onClick={ resetValue.bind(null, key) }
                                                    type={ getLocalIcon("/page/delete.svg") } /></span>;
        },
        handleMenuOnOk = (value) => {
            if (currentItems.length) {
                let valueObj = {};
                currentItems.map(item => {
                    if (item.value == value)
                        valueObj = item;
                });
                if (valueObj) {
                    currentValue[currentKey] = valueObj;
                    update({
                        currentValue
                    })
                    currentFilter[currentKey] = valueObj;
                    updateState({
                        currentFilter
                    })
                }
            }
        },
        getValue = () => {
            if (currentValue.hasOwnProperty(currentKey)) {
                const curValue = currentValue[currentKey];
                return curValue.hasOwnProperty("value") ? [curValue.value] : [];
            }
            return []
        };

    const onChange = (textQuery = "") => {
        updateState({
            textQuery
        })
        resetResult();
    };
    return (
        <div>
          <WingBlank/>
          <SearchBar value={ textQuery }
            placeholder={ "请输入搜索内容" }
            onClear={ onChange }
            onSubmit={ onSubmit }
            onChange={ onChange }
            onCancel={ goBack }
            showCancelButton={ true }
            focused={ defaultFocus } />
          <div className={ `${PrefixCls}-module` }>
            { layoutModules() }
          </div>
          <WhiteSpace/>
          <div className={ `${PrefixCls}-terms` }>
            <List>
              { layoutFilters() }
            </List>
            { isShow && currentKey ?
              <SelectMenu {...{ items: currentItems, values: getValue(), multiSelect: false, targetRef: refs[currentKey], onOk: handleMenuOnOk, onCancel: hideSelectMenu }}/> : "" }
          </div>
          <WhiteSpace/>
        </div>
        );
}

Filters.propTypes = {
    modules: PropTypes.array.isRequired,
    moduleMenu: PropTypes.object.isRequired,
};

export default Filters;
