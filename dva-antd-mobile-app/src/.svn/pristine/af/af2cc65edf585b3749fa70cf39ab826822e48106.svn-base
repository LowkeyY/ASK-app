import { SearchBar, Button, WhiteSpace, WingBlank, SegmentedControl, List, Radio } from 'antd-mobile';
const RadioItem = Radio.RadioItem;
class QueryUserlist extends React.Component {

    constructor(props) {
        super(props);
        const {queryusers = [], selectedUsers = []} = props;
        this.state = {
            textQuery: "",
            queryusers: [...queryusers],
            selectedUsers: [...selectedUsers],
            selectedIndex: 1
        };
    }

    goBack = () => {
        this.props.goBack();
    }
    onChange = (value) => {
        this.setState({
            textQuery: value
        })
    }
    clear = () => {
        this.setState({
            selectedIndex: 1
        });
    }
    submit = () => {
        this.props.toSearch({
            textQuery: this.state.textQuery
        })
    }
    handleChange = (e) => {
        this.setState({
            selectedIndex: e.nativeEvent.selectedSegmentIndex
        })
    }
    handleItemClick = (data) => {
        const {selectedIndex, selectedUsers} = this.state;
        switch (selectedIndex) {
        case 0: {
            this.setState({
                selectedUsers: [...selectedUsers, data]
            })
            break;
        }
        case 1: {
            const currentSelecteds = [];
            selectedUsers.map((user, i) => {
                if (user.value != data.value)
                    currentSelecteds.push(user);
            })
            this.setState({
                selectedUsers: [...currentSelecteds]
            })
            break;
        }
        }
    }

    layoutItems = () => {
        const {selectedIndex, queryusers, selectedUsers} = this.state,
            datas = selectedIndex == 0 ? [...queryusers] : [...selectedUsers];
        return (
            <List>
              { datas && datas.map(data => this.layoutItem(data)) }
            </List>
        )
    }

    layoutItem = (data) => {
        const {selectedIndex, selectedUsers} = this.state;
        const checked = selectedIndex == 1 || selectedUsers.includes(data);
        switch (selectedIndex) {
        case 0: {
            return (
                <List.Item onClick={ () => {
                         this.handleItemClick(data)
                     } }>
                  <RadioItem key={ data.value } checked={ checked }>
                    <span>{ data.text }</span>
                  </RadioItem>
                </List.Item>
            )
        }
        case 1: {
            return (
                <List.Item onClick={ () => {
                         this.handleItemClick(data)
                     } }>
                  <RadioItem key={ data.value } checked={ checked }>
                    <span>{ data.text }</span>
                  </RadioItem>
                </List.Item>
            )
        }
        }
    }

    render() {

        const {textQuery, queryusers, selectedUsers, showkey} = this.state,
            PrefixCls = "page-search";

        return (<div>
                  <WingBlank />
                  <SearchBar
                             value={ textQuery }
                             placeholder={ "请输入用户名称或者登陆名" }
                             focused
                             onClear={ this.clear }
                             onCancel={ this.goBack }
                             onSubmit={ this.submit }
                             onChange={ this.onChange } />
                  <div className={ `${PrefixCls}` }>
                    <SegmentedControl
                                      selectedIndex={ selectedIndex }
                                      values={ ['搜索结果', '已选用户'] }
                                      onChange={ this.handleChange }
                                      style={ { padding: '.2rem' } } />
                    <WingBlank size="sm">
                      { layoutItems() }
                    </WingBlank>
                  </div>
                </div>);
    }
}

export default QueryUserlist;