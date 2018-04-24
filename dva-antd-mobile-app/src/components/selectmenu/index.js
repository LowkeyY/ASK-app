import { Menu, ActivityIndicator, NavBar } from 'antd-mobile';
import ReactDOM from 'react-dom';
import './index.less';

const getTop = (targetRef) => {
    let el = ReactDOM.findDOMNode(targetRef),
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
    return top + hei;
};

class SelectMenu extends React.Component {
    constructor(props) {
        super(props);
        const {items = [], values = [], multiSelect = true, targetRef = ""} = props;
        this.state = {
            initData: [...items],
            values: Array.isArray(values) ? [...values] : [values],
            multiSelect: multiSelect,
            top: getTop(targetRef),
            height:cnDeviceHeight / 2
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
            values: value
        })
        if (!this.props.multiSelect && value.length) {
            this.props.onOk(value[0]);
            this.props.onCancel();
        }

    }
    onMaskClick = (e) => {
        e.preventDefault()
        this.props.onCancel();
        e.preventDefault();
    }
    render() {
        const {initData, values, multiSelect, top} = this.state,
            PrefixCls = "selectmenu";
        initData.map(data => {
            if (!data.label && data.text)
                data.label = data.text;
        })
        return (
            <div className={ `${PrefixCls}-container` }>
              <div className={ `${PrefixCls}-mask` } onTouchEnd={ this.onMaskClick } ref="mask"></div>
              <div className={ `${PrefixCls}-content` }>
                <div style={ { top: top } } className={ `${PrefixCls}` }>
                  <Menu className={ `${PrefixCls}-menu` }
                    data={ initData }
                    value={ values }
                    level={ 1 }
                    onOk={ this.onOk }
                    onCancel={ this.onCancel }
                    onChange={ this.onChange }
                    height={this.state.height}
                    multiSelect={ multiSelect } />
                </div>
              </div>
            </div>
            );
    }
}

export default SelectMenu;
