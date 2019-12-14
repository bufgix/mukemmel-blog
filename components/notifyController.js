import React from "react";
import Swal from "sweetalert2";

const EVENT_OPTIONS = {
  notFound: {
    icon: "error",
    text: "İçerik bulunamadı",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false
  },
  exit: {
    icon: "success",
    text: "Çıkış yaptınız",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false
  },
  create: {
    icon: "success",
    text: "İçerik oluşturuldu",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false
  },
  update: {
    icon: "success",
    text: "İçerik güncellendi",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false
  },
  wrongUser: {
    icon: "error",
    text: "Yönetim paneline sadece yönetici girebilir",
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false
  }
};

class NotifyController extends React.Component {
  componentDidMount() {
    const { events } = this.props;
    Object.keys(events).forEach(event => {
      if (events[event] === "true" && EVENT_OPTIONS[event]) {
        Swal.fire(EVENT_OPTIONS[event]);
      }
    });
    window.history.replaceState(null, null, window.location.pathname);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default NotifyController;
