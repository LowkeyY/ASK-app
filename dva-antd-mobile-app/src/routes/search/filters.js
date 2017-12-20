import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { WhiteSpace, WingBlank, Flex, Radio, List, SearchBar } from 'antd-mobile';
import './index.less';
import SelectMenu from 'components/selectmenu';
const RadioItem = Radio.RadioItem;

const PrefixCls = "page-search";
function Filters(filters) {
  const {modules, moduleMenu, textQuery, currentModuleId, currentFilter, filterProps, update, updateState, onSubmit, goBack, resetResult} = filters,
    {currentKey, currentValue, currentItems, refs, isShow} = filterProps;

  const handleModuleClick = (currentModuleId) => {
      //更改选择模块以后，清空所选参数, 关闭已打开选项卡；
      updateState({
        currentModuleId,
        currentFilter: {},
        filterProps: {
          ...filterProps,
          isShow: false
        }
      })
    },
    handleFilterClick = (key, currentItems) => {
      update({
        isShow: currentKey != key ? true : !isShow,
        currentKey: key,
        currentItems
      })
    },
    hideSelectMenu = () => {
      update({
        isShow: false
      })
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
                <Flex.Item
                           className={ `${checked ? "active" : ""}` }
                           onClick={ () => {
                                       handleModuleClick(i.value)
                                     } }>
                  <RadioItem
                             key={ i.value }
                             checked={ checked }>
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
          <List.Item
                     onClick={ handleFilterClick.bind(null, key, items) }
                     arrow={ isShow && currentKey == key ? "up" : "down" }
                     extra={ getFilterValue(key, title, items) }
                     ref={ el => refs[key] = el }>
            { title }
          </List.Item>
        )
      } else {
        return (
          <List.Item
                     arrow="horizontal"
                     extra={ `选择${title}(全部)` }>
            { title }
          </List.Item>
        )
      }
    },
    getFilterItemValue = (item) => {
      return item.text || item.label || "";
    },
    getFilterValue = (key, title) => {
      const curValue = currentValue[key];
      if (curValue)
        return getFilterItemValue(curValue);
      return `选择${title}(全部)`;
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
      <WingBlank />
      <SearchBar
                 value={ textQuery }
                 placeholder={ "请输入搜索内容" }
                 onClear={ onChange }
                 onSubmit={ onSubmit }
                 onChange={ onChange }
                 onCancel={ goBack }
                 focused/>
      <div className={ `${PrefixCls}-module` }>
        { layoutModules() }
      </div>
      <WhiteSpace />
      <div className={ `${PrefixCls}-terms` }>
        <List>
          { layoutFilters() }
        </List>
        { isShow && currentKey ?
          <SelectMenu { ...{ items: currentItems, values: getValue(), multiSelect: false, targetRef: refs[currentKey], onOk: handleMenuOnOk, onCancel: hideSelectMenu }}/> : "" }
      </div>
      <WhiteSpace />
    </div>
  );
}

Filters.propTypes = {
  modules: PropTypes.object.isRequired,
  moduleMenu: PropTypes.object.isRequired,
};

export default Filters;