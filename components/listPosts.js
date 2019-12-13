import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

class ListPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  deletePost(postSlug) {
    axios
      .delete(`${process.env.DOMAIN}/api/posts/${postSlug}`)
      .then(res => {
        Swal.fire({
          icon: "success",
          text: "İçerik başarıyla silindi",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
        this.getPosts();
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          text: "İçerik silinirken hata oluştur",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
        console.log(err);
      });
  }

  getPosts() {
    axios
      .get(`${process.env.DOMAIN}/api/posts`)
      .then(res => {
        this.setState({
          posts: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getPosts();
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="list-post-container">
        <ul className="list-post">
          {posts.map((post, index) => (
            <li key={index} className="list-post-item-wrapper">
              <div className="list-post-item d-flex">
                <div className="mr-auto">{post.title}</div>
                <ul>
                  <li>
                    <a href="#" className="edit">
                      Düzenle
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="delete"
                      onClick={() => {
                        this.deletePost(post.slug);
                      }}
                    >
                      Sil
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default ListPost;
