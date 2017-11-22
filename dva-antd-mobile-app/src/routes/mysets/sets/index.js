import { List} from 'antd-mobile';
import styles from './index.less'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
const Item = List.Item;
const defaultImgSrc = require("themes/images/user.png");
let Sets =({dispatch,loading}) =>{

  const handleChange = ()=> {
      dispatch(routerRedux.push({pathname:"/fontcontrol"}))
  };
    return (
      <div>
        <List className="my-list">
          <Item>
             <p className={styles["sets-icon-title"]}>头像</p>
             <div className={styles["sets-icon-img-box"]}>
              <img src={defaultImgSrc} alt="icon"/>
            </div>
          </Item>
          <Item extra={'系统用户'}>用户名</Item>
          <Item extra={'将军'}>等级</Item>
          <Item
            arrow="horizontal"
            onClick={handleChange}
           >字体大小</Item>
        </List>
      </div>
    )

};

export default connect(({ sets, loading }) => ({ sets, loading }))(Sets);

