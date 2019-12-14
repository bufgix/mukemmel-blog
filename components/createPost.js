import React, { createRef } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import MarkdownIt from "markdown-it";
import MarkdownItEmoji from "markdown-it-emoji";
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
      content: !props.isUpdate
        ? props.content ||
          "`![Banner](<img_url>)`\nBunu unutma! içeriğin giriş resmi olacak."
        : props.updatePost.details,
      title: !props.isUpdate ? props.title : props.updatePost.title
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
    }).use(MarkdownItEmoji);
    this.editorHeight = 500;
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
    const { isUpdate, updatePost } = this.props;
    const bannerImage = this.getBannerImageUrl();
    const apiUrl = isUpdate
      ? `${process.env.DOMAIN}/api/posts/${updatePost.slug}/update`
      : `${process.env.DOMAIN}/api/posts/create`;
    if (bannerImage) {
      axios
        .post(apiUrl, {
          title: title,
          content: content.replace(/^!\[Banner\]\((.+)\)/, ""),
          imageUrl: bannerImage
        })
        .then(res => {
          Router.push(`/?${isUpdate ? "update" : "create"}=${true}`);
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
    const { title, content } = this.state;
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
          <div
            style={{ height: this.editorHeight }}
            className="create-post-editor"
          >
            <MdEditor
              value={content}
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
  save: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string,

  isUpdate: PropTypes.bool,
  updatePost: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    imageUrl: PropTypes.string,
    slug: PropTypes.string
  })
};

CreatePost.defaultProps = {
  isUpdate: false,
  updatePost: null,
  save: null,
  title: null,
  content: null
};

export default CreatePost;
