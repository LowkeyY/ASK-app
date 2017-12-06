import React from 'react'
import styles from '../index.less'
import classnames from 'classnames'
const Css ='editorbox';

class EditorContainer extends React.Component{
  constructor(props){
    super();
    this.state={
      currentIndex:null,
      isActive:false
    };
  }
  onActive(index){
    console.log(index);
    this.setState({
      currentIndex:index,
      isActive:!this.state.isActive
    })
  }

  render(){

    return(
         <div className={styles[`${Css}-box`]}>
           {
             React.Children.map(this.props.children, (element, index) => {
               // let style= (index===this.state.currentIndex||false)?{background:'#c1c1c1'}:{};
               let itmeClass=classnames({
                 // 'editorbox-box-item':true,
                 'active':index===this.state.currentIndex&&this.state.isActive
               });
               return (<div
                 className={itmeClass}
                 onClick={
                   this.onActive.bind(this,index)
                 }
               >{element}</div>)
             })
           }
         </div>
    )
  }
}
export default EditorContainer
