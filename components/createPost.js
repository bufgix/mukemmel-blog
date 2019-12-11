import React, { createRef } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import MarkdownIt from "markdown-it";
import axios from "axios";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

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
      content: "",
      title: props.title
    };

    this.mdParser = new MarkdownIt({
      highlight: function(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (__) {}
        }
        return "";
      },
      html: true
    });

    this.editorHeight = 500;
    this.bootContent =
      props.content ||
      "`![Banner](<img_ul>)`\nBunu unutma! içeriğin giriş resmi olacak.";
  }

  componentDidMount() {
    hljs.initHighlightingOnLoad();
  }

  handleEditorChange({ text }) {
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
    const { content, title } = this.state;
    const bannerImage = this.getBannerImageUrl();
    if (bannerImage) {
      axios
        .post(`${process.env.DOMAIN}/api/posts/create`, {
          title: title,
          content: content.replace(/^!\[Banner\]\((.+)\)/, ""),
          imageUrl: bannerImage
        })
        .then(res => {
          Router.push(`/?create=${true}`);
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

  componentWillUnmount() {
    const { save } = this.props;
    const { content, title } = this.state;
    save(title, content);
  }
  render() {
    const { title } = this.state;
    return (
      <div className="create-post mb-4">
        <form onSubmit={this.sendPost.bind(this)}>
          <h3 className="create-post-title">
            Başlık{" "}
            <span className="text-muted">İlgi çekici olmasına dikkat et</span>
          </h3>
          <hr className="fancy-hr" />
          <input
            value={title}
            onChange={e => {
              this.setState({
                title: e.target.value
              });
            }}
            autoComplete="off"
            className="my-3"
            type="text"
            name="title"
            placeholder="Dünaynın en iyi başlığı"
            required
          />
          <h3>
            İçerik{" "}
            <span className="text-muted">Tamemen Markdown. Keyfini çıkar</span>
          </h3>
          <hr className="fancy-hr" />
          <div style={{ height: this.editorHeight }} className="create-post-editor">
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

CreatePost.propTypes = {
  save: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

export default CreatePost;
