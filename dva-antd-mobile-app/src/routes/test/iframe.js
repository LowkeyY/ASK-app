import { RefreshControl, ListView } from 'antd-mobile';
import ReactDOM from 'react-dom';

class Iframes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            height: document.documentElement.clientHeight - 45,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            if (ReactDOM.findDOMNode(this.lv)) {
                const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop - 45;
                this.setState({
                    height: hei,
                })
            }
        }, 0);
    }

    render() {
        return (
            <iframe ref={ el => this.lv = el } src={ this.props.url } style={ { width: "100%", height: this.state.height, border: 0 } }>
            </iframe>
            );
    }
}

export default Iframes;