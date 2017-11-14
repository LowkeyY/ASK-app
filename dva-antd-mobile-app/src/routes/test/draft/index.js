/**
 * Created by hao.cheng on 2017/4/26.
 */
import React, {Component} from 'react';
import {Card} from 'antd-mobile';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import draftToMarkdown from 'draftjs-to-markdown';
import styles from './index.less'

const rawContentState = {
  "entityMap": {
    "0": {
      "type": "IMAGE",
      "mutability": "MUTABLE",
      "data": {"src": "http://i.imgur.com/aMtBIep.png", "height": "auto", "width": "100%"}
    }
  },
  "blocks": [{
    "key": "9unl6",
    "text": "",
    "type": "unstyled",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": {}
  }, {
    "key": "95kn",
    "text": " ",
    "type": "atomic",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [{"offset": 0, "length": 1, "key": 0}],
    "data": {}
  }, {
    "key": "7rjes",
    "text": "",
    "type": "unstyled",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": {}
  }]
};

class Wysiwyg extends Component {
  state = {
    editorContent: undefined,
    contentState: rawContentState,
    editorState: '',
    options: ['inline', 'textAlign', 'emoji', 'image']

  };

  toggleToolbarShow = () => {

    this.setState({
      options: ['inline', 'textAlign', 'emoji', 'image'],
    })
  };
  toggleToolbarhide = () => {
    this.setState({
      options: [],
    })
  };
  onEditorChange = (editorContent) => {
    this.setState({
      editorContent,
    });
  };

  clearContent = () => {
    this.setState({
      contentState: '',
    });
  };

  onContentStateChange = (contentState) => {
    console.log('contentState', contentState);
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  imageUploadCallBack = file => new Promise(
    // (resolve, reject) => {
    //   const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
    //   xhr.open('POST', 'https://api.imgur.com/3/image');
    //   xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
    //   const data = new FormData(); // eslint-disable-line no-undef
    //   data.append('image', file);
    //   xhr.send(data);
    //   xhr.addEventListener('load', () => {
    //     const response = JSON.parse(xhr.responseText);
    //     resolve(response);
    //   });
    //   xhr.addEventListener('error', () => {
    //     const error = JSON.parse(xhr.responseText);
    //     reject(error);
    //   });
    // }
  );
  // noinspection JSAnnotator
  // options: ['inline' , 'fontSize' , 'list', 'textAlign'  , 'colorPicker', 'link', 'embedded', 'emoji', 'image'  , 'history'],
  render() {
    const {editorContent, editorState} = this.state;
    return (
      <div className="gutter-example button-demo">
        <Card title="富文本编辑器" bordered={false}>
          <Editor
            editorState={editorState}
            toolbarClassName={styles.toolbar}
            wrapperClassName={styles.wrapper}
            editorClassName={styles.editor}
            onEditorStateChange={this.onEditorStateChange}
            toolbar={{
              options: this.state.options,
              history: {inDropdown: false},
              inline: {
                options: ['bold','italic','monospace'],
                inDropdown: false
              },
              list: {inDropdown: false},
              textAlign: {inDropdown: false},
              image: {
                urlEnabled:false,
                uploadEnabled: true,
                alignmentEnabled: true,
                uploadCallback: this.imageUploadCallBack,
              },
            }}
            onContentStateChange={this.onEditorChange}
            placeholder=""
            spellCheck
            onFocus={this.toggleToolbarShow}
            // onBlur={this.toggleToolbarhide}
            onTab={() => {
              console.log('tab');
              return true;
            }}
            localization={{locale: 'zh', translations: {'generic.add': '添加'}}}
          />

          <style>{`
                        .home-editor {
                            min-height:600px;
                        }
                    `}</style>
        </Card>{/*
                <Card title="同步转换HTML" bordered={false}>
                    <pre>{draftToHtml(editorContent)}</pre>
                </Card>
                <Card title="同步转换MarkDown" bordered={false}>
                    <pre style={{whiteSpace: 'pre-wrap'}}>{draftToMarkdown(editorContent)}</pre>
                </Card>
                <Card title="同步转换JSON" bordered={false}>
                    <pre style={{whiteSpace: 'normal'}}>{JSON.stringify(editorContent)}</pre>
                </Card>*/}
      </div>
    );
  }
}

export default Wysiwyg;
