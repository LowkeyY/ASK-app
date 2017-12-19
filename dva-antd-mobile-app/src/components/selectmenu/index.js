import { Menu, ActivityIndicator, NavBar } from 'antd-mobile';
import './index.less';

class SelectMenu extends React.Component {
  constructor(props) {
    super(props);
    const {items = [], top = 0, values = [], multiSelect = true} = props;
    this.state = {
      initData: items,
      top: top,
      values: [...values],
      multiSelect: multiSelect
    };
  }
  onOk = (value) => {
    this.props.onOk(value);
  }
  onCancel = () => {
      this.props.onCancel();
  }
  onChange = (value) => {
    this.setState({
      values : value
    })
    if(!this.props.multiSelect && value.length){
      this.props.onOk(value[0]);
    }
  }
  onMaskClick = () => {
    this.onCancel();
  }

  render() {
    const {initData, top, values, multiSelect} = this.state,
      PrefixCls = "selectmenu";
    return (
      <div
           style={ { top: top } }
           className={ `${PrefixCls}` }>
        <Menu
              className={ `${PrefixCls}-menu` }
              data={ initData }
              value={ values }
              level={ 1 }
              onOk={ this.onOk }
              onCancel={ this.onCancel }
              onChange={this.onChange}
              multiSelect={ multiSelect } />
        <div
             className={ `${PrefixCls}-mask` }
             onClick={ this.onMaskClick } />
      </div>
    );
  }
}


export default SelectMenu;