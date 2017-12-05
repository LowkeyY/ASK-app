import React from 'react'
import styles from './index.less'
import {Icon} from 'antd-mobile'
import {getLocalIcon} from 'utils'
const Css = 'editorbox';
const typeBtn=[
  '加粗','斜体','居中','两端对齐','表情','上传图片','相机'
];
class  EditorBox extends React.Component{
  constructor(){
    super();
    this.state={
      isActive:0
    };
    this.ActiveBold = this.ActiveBold.bind(this);
  }
  ActiveBold(){//粗体
    this.setState({
      isActive:!this.state.isActive
    })
  }
  ActiveItalic(){//斜体
    this.setState({
      isActive:!this.state.isActive
    })
  }
  activeCenter(){//居中
    this.setState({
      isActive:!this.state.isActive
    })
  }
  activeJustify(){//对齐
    this.setState({
      isActive:!this.state.isActive
    })
  }
  activeE(){
    this.setState({//表情
      isActive:!this.state.isActive
    })
  }
  activePhoto(){//照片
    this.setState({
      isActive:!this.state.isActive
    })
  }
  activeCamera(){//相机
    this.setState({
      isActive:!this.state.isActive
    })
  }
  render(){
    const active={
      background:'#888'
    },
    style=this.state.isActive?active:{};
    return(
      <div className={styles[`${Css}-box`]}>
        {/*{*/}
          {/*typeBtn.map(i=>{*/}
           {/*return <div*/}
              {/*key={i}*/}
              {/*onClick={this.Active}*/}
              {/*className={styles[`${Css}-box-item`]}>*/}
              {/*<Icon type={getLocalIcon(`/editor/${i}.svg`)}/>*/}
            {/*</div>*/}
          {/*})*/}
        {/*}*/}
        <div
          onTouchStart={this.ActiveBold}
          className={styles[`${Css}-box-item`]}>
          <Icon type={getLocalIcon('/editor/加粗.svg')}/>
        </div>
        <div
          onTouchStart={this.ActiveItalic}
          className={styles[`${Css}-box-item`]}>
          <Icon type={getLocalIcon('/editor/斜体.svg')}/>
        </div>
        <div
          onTouchStart={this.activeCenter}
          className={styles[`${Css}-box-item`]}>
          <Icon type={getLocalIcon('/editor/居中.svg')}/>
        </div>
        <div
          onTouchStart={this.activeJustify}
          className={styles[`${Css}-box-item`]}>
          <Icon type={getLocalIcon('/editor/两端对齐.svg')}/>
        </div>
        <div
          onTouchStart={this.activeE}
          className={styles[`${Css}-box-item`]}>
          <Icon type={getLocalIcon('/editor/表情.svg')}/>
        </div>
        <div
          onTouchStart={this.activePhoto}
          className={styles[`${Css}-box-item`]}>
          <Icon type={getLocalIcon('/editor/上传图片.svg')}/>
        </div>
        <div
          onTouchStart={this.activeCamera}
          className={styles[`${Css}-box-item`]}>
          <Icon type={getLocalIcon('/editor/相机.svg')}/>
        </div>
      </div>
    )
  }

}
export default EditorBox
