import React from "react";
import dynamic from "next/dynamic";
import { Form } from "react-bootstrap";
import MarkdownIt from "markdown-it";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false
});

import "highlight.js/styles/atelier-plateau-dark.css";
import hljs from "highlight.js";

class CreatePost extends React.Component {
  mdParser = null;
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };

    this.mdParser = new MarkdownIt({
      highlight: function(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (__) {}
        }
        return "";
      }
    });
    this.editorHeight = 500;
    this.bootContent =
      "`![Banner](<img_ul>)`\nBunu unutma! içeriğin giriş resmi olacak.";
  }

  componentDidMount() {
    hljs.initHighlightingOnLoad();
  }

  handleEditorChange({ html, text }, event) {
    this.setState({
      content: text
    });
  }

  getBannerImageUrl() {
    const images = this.state.content.match(
      /!\[Banner\]\((.+?\.(?:png|jpg)[^)]*)\)/
    );
    if (typeof images[1] !== "undefined") {
      console.log(images[1]);
    }
  }

  render() {
    return (
      <div className="create-post mb-4">
        <h3 className="create-post-title">
          Başlık{" "}
          <span className="text-muted">İlgi çekici olmasına dikkat et</span>
        </h3>
        <hr className="fancy-hr" />
        <Form.Control
          autoComplete="off"
          className="my-3"
          type="text"
          name="title"
          placeholder="Dünaynın en iyi başlığı"
        />
        <h3>
          İçerik{" "}
          <span className="text-muted">Tamemen Markdown. Keyfini çıkar</span>
        </h3>
        <hr className="fancy-hr" />
        <div style={{ height: this.editorHeight }}>
          <MdEditor
            value={this.bootContent}
            renderHTML={text => this.mdParser.render(text)}
            config={{
              markdownClass: "darkMd",
              view: {
                md: true,
                menu: true,
                fullScreen: true,
                html: true
              }
            }}
            onChange={this.handleEditorChange.bind(this)}
          />
        </div>
        <a className="my-4" href="#">
          Yayınla
        </a>
      </div>
    );
  }
}

export default CreatePost;
