import { List,WhiteSpace , Switch} from 'antd-mobile';
import styles from './index.less'
import { createForm } from 'rc-form';

const Item = List.Item;
const defaultImgSrc = require("themes/images/user.png");
let Sets =(props) =>{

    const { getFieldProps } = props.form;
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
          <Item extra={<Switch
            {...getFieldProps('Switch1', {
              initialValue: false,
              valuePropName: 'checked',
            })}
            onClick={(checked) => { console.log(checked); }}
          />}>字体放大</Item>
        </List>
      </div>
    )

};

export default  createForm()(Sets)

