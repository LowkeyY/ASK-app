import { Menu, ActivityIndicator, NavBar } from 'antd-mobile';
import ReactDOM from 'react-dom';
import './index.less';

class SelectMenu extends React.Component {
    constructor(props) {
        super(props);
        const {items = [], values = [], multiSelect = true, targetRef = ""} = props;
        this.state = {
            initData: [...items],
            targetRef: targetRef,
            values: [...values],
            multiSelect: multiSelect
        };
    }

    getTop = () => {
        let el = ReactDOM.findDOMNode(this.state.targetRef),
            top = 0,
            hei = 0;
        if (el) {
            hei = el.clientHeight;
            top = el.offsetTop;
            while (el.offsetParent) {
                el = el.offsetParent;
                top += el.offsetTop + el.clientTop;
            }
        }
      console.log(top)
        return top + hei;

    }

    onOk = (value) => {
        this.props.onOk(value);
    }
    onCancel = () => {
        this.props.onCancel();
    }
    onChange = (value) => {
        this.setState({
            values: value
        })
        if (!this.props.multiSelect && value.length) {
            this.props.onOk(value[0]);
        }
    }
    onMaskClick = () => {
        this.onCancel();
    }

    render() {
        const {initData, values, multiSelect} = this.state,
            PrefixCls = "selectmenu";
        initData.map(data => {
            if (!data.label && data.text)
                data.label = data.text;
        })
        const top = this.getTop();
      return (
            <div style={ { top: top } } className={ `${PrefixCls}` }>
              <Menu
                    className={ `${PrefixCls}-menu` }
                    data={ initData }
                    value={ values }
                    level={ 1 }
                    onOk={ this.onOk }
                    onCancel={ this.onCancel }
                    onChange={ this.onChange }
                    multiSelect={ multiSelect } />
              <div className={ `${PrefixCls}-mask` } onClick={ this.onMaskClick } />
            </div>
            );
    }
}


export default SelectMenu;
