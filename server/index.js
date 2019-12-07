const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2");
const session = require("express-session");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const git = require("git-last-commit");
const slugify = require("slugify");

// Calling models
const Post = require("./models/post");

// Databse connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
let db = mongoose.connection;

db.on("error", err => {
  console.log(`Databse connection error: ${err}`);
});
db.on("open", () => {
  console.log("Database connected");
});

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const PORT = process.env.PORT;

nextApp.prepare().then(() => {
  const app = express();

  // Body parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Session
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true
    })
  );

  // Passport configure
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
      },
      (accessToken, refreshToken, profile, done) => {
        done(null, profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile"]
    })
  );

  const isUserAuthenticated = (req, res, next) => {
    if (req.user) {
      console.log("Bir user var");
      if (req.user.id === process.env.GOOGLE_ADMIN_ID) {
        console.log("Hos gelidin ömer");
        next();
      } else {
        console.log("Farklı kullanıcı");
        req.logout();
        res.redirect("/");
      }
    } else {
      console.log("login olmamıs");
      res.redirect("/auth/google"); // TODO: Bunu daha sonra değiştir
    }
  };

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { scope: ["profile"] }),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/api/getlastcommit", (req, res) => {
    git.getLastCommit((err, { shortHash, branch }) => {
      res.status(200).json({ shortHash, branch });
    });
  });

  app.get("/api/posts", (req, res) => {
    Post.find({}, (err, posts) => {
      if (err) throw err;
      res.status(200).json(posts);
    });
  });

  // TODO: login_required
  app.post("/api/posts/create", isUserAuthenticated, (req, res) => {
    const { title, content, imageUrl } = req.body;
    let post = new Post({
      title: title,
      details: content,
      imageUrl: imageUrl,
      slug: slugify(title)
    });
    post.save(err => {
      if (err) throw err;
      res.status(200).json(post);
    });
  });

  // TODO: Login required
  app.get("/dashboard", isUserAuthenticated, (req, res) => {
    return handle(req, res);
  });

  app.get("/api/posts/:slug", (req, res) => {
    Post.findOne({ slug: req.params.slug }, (err, post) => {
      if (err) throw err;
      console.log(post);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json("Notfound");
      }
    });
  });

  app.get("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(PORT, err => {
    if (err) throw err;
    console.log(`Express ready on > ${PORT}`);
  });
});
