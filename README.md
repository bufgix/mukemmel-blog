<h1 align="center">bufgix-blog'a hoşgeldiniz 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.2-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/bufgix" target="_blank">
    <img alt="Twitter: bufgix" src="https://img.shields.io/twitter/follow/bufgix.svg?style=social" />
  </a>
</p>

> Kişisel blog

### 🏠 [Homepage](http://bufgix.space)

## Yükleme
Gerekli bağımlılıları yükleyin

```sh
yarn
```

## Kullanımı

Blog çalışabilmesi için bazı ortam değişkenlerine ihtiyaç duyar

| Değer  | Açıklama  |
|---|---|
| DOMAIN  |  Uygulamayı yayınladığınız sunucu adresi. Localhost için (http://``localhost:3000``) |
| GOOGLE_ADMIN_ID  |  Yönetici google hesabının id değeri |
| GOOGLE_CALLBACK_URL |  Google call back değeri Sadece server adresini değişmeniz yeterli olur |
| GOOGLE_CLIENT_ID  |  Google client id  |
| GOOGLE_CLIENT_SECRET  |  Google client secret |
| MONGO_URL |  Mongo db adresi |
| NODE_ENV  | `development` veya `production`  |
| SESSION_SECRET  | Forum işlemleri için  gerkli gizli anahtar |
|  PORT |  Sunucu için port  |


Örnek `.env` dosyası
```env
DOMAIN=http://localhost:3000
GOOGLE_ADMIN_ID=111111111111111111
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
GOOGLE_CLIENT_ID=1111111111-2222222222222222222222222222.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=33333333333333333333
MONGO_URL=mongodb://localhost:2712/bufgix-blog
NODE_ENV=development
SESSION_SECRET=im_secret
PORT=3000
```

```sh
yarn dev
```

diyerek geliştirici sunucusu çalıştırın

## Author

👤 **bufgix**

* Website: http://www.bufgix.space/
* Twitter: [@bufgix](https://twitter.com/bufgix)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
