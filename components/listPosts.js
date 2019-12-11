import React from "react";

class ListPost extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { posts, deletePost } = this.props;
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
                    <a href="#" className="delete">
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
