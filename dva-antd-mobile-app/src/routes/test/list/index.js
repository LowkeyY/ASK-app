import { List, InputItem, Switch, Stepper, Range, Button, createTooltip , Toast , TextareaItem} from 'antd-mobile';
import { createForm } from 'rc-form';
import DemoDraft from '../draft';
import styles from './index.less'

const Item = List.Item;
const RangeWithTooltip = createTooltip(Range);

class BasicInput extends React.Component {
  state = {
    value: 1,
  }
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        console.log(this.props.form.getFieldsValue());
      } else {
        Toast.fail("请检查表单错误", 3);
      }
    });
  }
  onReset = () => {
    this.props.form.resetFields();
  }
  validateAccount = (rule, value, callback) => {
    if (value && value.length > 1) {
      callback();
    } else {
      callback(new Error(''));
    }
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form,
      PrefixCls="demo-list";

    return (<form>
      <List renderHeader={() => ''}
        renderFooter={() => getFieldError('title') && getFieldError('title').join(',')}
      >
        <TextareaItem
            title="标题"
            placeholder="请在此输入标题  ， 最多可输入50个字符"
            autoHeight
            {...getFieldProps('title', {
            rules: [
              { required: true, message: '主题必须输入' },
              { max: 50, message: '输入内容不能超过50个字符' },
              { validator: this.validateAccount },
            ],
          })}
          clear
          error={!!getFieldError('title')}
          onErrorClick={() => {
            Toast.fail(getFieldError('title').join('、'), 3);
          }}
        />
        {/*<InputItem*/}
          {/*{...getFieldProps('users', {*/}
            {/*initialValue: '系统管理员',*/}
            {/*rules: [*/}
              {/*{ required: true, message: '编制人必须输入' },*/}
              {/*{ validator: this.validateAccount },*/}
            {/*],*/}
          {/*})}*/}
          {/*clear*/}
          {/*error={!!getFieldError('users')}*/}
          {/*onErrorClick={() => {*/}
            {/*Toast.fail(getFieldError('users').join('、'), 3);*/}
          {/*}}*/}
          {/*placeholder=""*/}
        {/*>编制人</InputItem>*/}
        {/*<InputItem*/}
          {/*{...getFieldProps('author', {*/}
            {/*initialValue: '系统管理员',*/}
            {/*rules: [*/}
              {/*{ required: true, message: '作者必须输入' },*/}
              {/*{ validator: this.validateAccount },*/}
            {/*],*/}
          {/*})}*/}
          {/*clear*/}
          {/*error={!!getFieldError('author')}*/}
          {/*onErrorClick={() => {*/}
            {/*Toast.fail(getFieldError('author').join('、'), 3);*/}
          {/*}}*/}
          {/*placeholder=""*/}
        {/*>作者</InputItem>*/}
        {/*<InputItem*/}
          {/*{...getFieldProps('dists', {*/}
            {/*initialValue: '总部',*/}
            {/*rules: [*/}
              {/*{ required: true, message: '部门必须输入' },*/}
              {/*{ validator: this.validateAccount },*/}
            {/*],*/}
          {/*})}*/}
          {/*clear*/}
          {/*error={!!getFieldError('dists')}*/}
          {/*onErrorClick={() => {*/}
            {/*Toast.fail(getFieldError('dists').join('、'), 3);*/}
          {/*}}*/}
          {/*placeholder=""*/}
        {/*>部门</InputItem>*/}
        {/*<InputItem*/}
          {/*{...getFieldProps('childsystem', {*/}
            {/*initialValue: '',*/}
            {/*rules: [*/}
              {/*{ required: true, message: '部门必须输入' },*/}
              {/*{ validator: this.validateAccount },*/}
            {/*],*/}
          {/*})}*/}
          {/*clear*/}
          {/*error={!!getFieldError('childsystem')}*/}
          {/*onErrorClick={() => {*/}
            {/*Toast.fail(getFieldError('childsystem').join('、'), 3);*/}
          {/*}}*/}
          {/*placeholder="请选择分系统"*/}
        {/*>分系统</InputItem>*/}
        {/*<InputItem*/}
          {/*{...getFieldProps('types', {*/}
            {/*initialValue: '',*/}
            {/*rules: [*/}
              {/*{ required: true, message: '分系统必须输入' },*/}
              {/*{ validator: this.validateAccount },*/}
            {/*],*/}
          {/*})}*/}
          {/*clear*/}
          {/*error={!!getFieldError('types')}*/}
          {/*onErrorClick={() => {*/}
            {/*Toast.fail(getFieldError('types').join('、'), 3);*/}
          {/*}}*/}
          {/*placeholder="请选择所属分类"*/}
        {/*>所属分类</InputItem>*/}
        {/*<InputItem*/}
          {/*{...getFieldProps('numbers', {*/}
            {/*initialValue: '',*/}
            {/*rules: [*/}
              {/*{ required: true, message: '设备型号必须输入' },*/}
              {/*{ validator: this.validateAccount },*/}
            {/*],*/}
          {/*})}*/}
          {/*clear*/}
          {/*error={!!getFieldError('numbers')}*/}
          {/*onErrorClick={() => {*/}
            {/*Toast.fail(getFieldError('numbers').join('、'), 3);*/}
          {/*}}*/}
          {/*placeholder="请输入设备型号"*/}
        {/*>设备型号</InputItem>*/}
        {/*<InputItem {...getFieldProps('indexs')} placeholder="请用' 、'分隔">*/}
          {/*关键索引词*/}
        {/*</InputItem>*/}
        {/*<InputItem {...getFieldProps('atts')}>*/}
          {/*附件*/}
        {/*</InputItem>*/}
        <Item className={styles["my-draft-list"]}>
          <DemoDraft {...getFieldProps('contents', { valuePropName: 'checked' })}/></Item>
        <Item>
          <Button type="primary" onClick={this.onSubmit} inline>提交</Button>
          <Button onClick={this.onReset} inline style={{ marginLeft: 5 }}>重置</Button>
          <Button onClick={this.onReset} inline className={styles[`${PrefixCls}-preview-btn`]}>预览</Button>
        </Item>
      </List>
    </form>);
  }
}

export default createForm()(BasicInput);

