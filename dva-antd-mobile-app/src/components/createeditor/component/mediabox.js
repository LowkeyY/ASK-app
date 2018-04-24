import React from 'react';
import { Icon } from 'antd-mobile';
import { getLocalIcon } from 'utils'
import styles from '../index.less'

class MediaControls extends React.Component {
    constructor() {
        super()
    }

    render() {
        const isAndroid = cnIsAndroid();
        return (
            <div className={ styles['RichEditor-controls-media'] }>
              <span className={ styles['RichEditor-controls-media-img-box'] }><input type="file"
                                                     accept="image/*"
                                                     multiple="multiple"
                                                     onChange={ this.props.handleFileInput } /> <Icon type={ getLocalIcon('/editor/sendimg.svg') } size="sm"/></span>
              { isAndroid ?
                <span className={ styles['RichEditor-controls-media-camera-box'] } onClick={ cnTakePhoto.bind(null, this.props.handleFileInput, 1) }><Icon type={ getLocalIcon('/editor/camera.svg') } size="sm" /></span>
                : <span className={ styles['RichEditor-controls-media-camera-box'] }><input onChange={ this.props.handleFileInput }
                                                         type="file"
                                                         accept="image/*"
                                                         capture='camera' /><Icon type={ getLocalIcon('/editor/camera.svg') } size="xs" /></span> }
              <span className={ styles['RichEditor-controls-media-item'] } onClick={ this.props.toggleEmojiBox }><Icon type={ getLocalIcon('/editor/emjoy.svg') } size="sm"/></span>
            </div>
        )
    }

}

export default MediaControls
