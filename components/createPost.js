import React, { createRef } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import MarkdownIt from "markdown-it";
import axios from "axios";
import Swal from "sweetalert2";

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
    this.titleRef = createRef();

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
    this.mdParser.use(markdownItAttrs, {
      // optional, these are default options
      leftDelimiter: "{",
      rightDelimiter: "}",
      allowedAttributes: [] // empty array = all attributes are allowed
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
    const images = this.state.content.match(/^!\[Banner\]\((.+)\)/);
    if (images) {
      return images[1];
    } else return false;
  }

  sendPost(e) {
    e.preventDefault();
    const { content } = this.state;
    const bannerImage = this.getBannerImageUrl();
    if (bannerImage) {
      axios
        .post("http://localhost:3000/api/posts/create", {
          title: this.titleRef.current.value,
          content: content.replace(/^!\[Banner\]\((.+)\)/, ""),
          imageUrl: bannerImage
        })
        .then(res => {
          console.log(res);
          Router.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      Swal.fire({
        title: "Hmmm",
        html:
          "Görünüşe göre gönderine başlangıç resmi koymayı unutmuşsun.<br>Resmini gönderini en başına koyabilirsin<code>![Banner](<img_ul>)</code> ",
        icon: "question",
        confirmButtonText: "Anladım"
      });
    }
  }

  render() {
    return (
      <div className="create-post mb-4">
        <form onSubmit={this.sendPost.bind(this)}>
          <h3 className="create-post-title">
            Başlık{" "}
            <span className="text-muted">İlgi çekici olmasına dikkat et</span>
          </h3>
          <hr className="fancy-hr" />
          <input
            autoComplete="off"
            className="my-3"
            type="text"
            name="title"
            placeholder="Dünaynın en iyi başlığı"
            required
            ref={this.titleRef}
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
          <button type="submit">
            <a className="my-4">Yayınla</a>
          </button>
        </form>
      </div>
    );
  }
}

export default CreatePost;
