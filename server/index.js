const express = require("express");
const paginate = require("express-paginate");
const next = require("next");
const bodyParser = require("body-parser");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2");
const session = require("express-session");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
var cors = require("cors");
// Calling models
const Post = require("./models/post");
const Tag = require("./models/tag");
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

  // Pagination
  // TODO change limit
  app.use(paginate.middleware(5, 50));
  // Session
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true
    })
  );

  // Passport configure
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(cors({ origin: process.env.DOMAIN, credentials: true }));

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
      if (req.user.id === process.env.GOOGLE_ADMIN_ID) {
        next();
      } else {
        req.logout();
        res.redirect("/?wrongUser=true");
      }
    } else {
      res.redirect("/auth/google"); // TODO: Bunu daha sonra değiştir
    }
  };

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { scope: ["profile"] }),
    (req, res) => {
      res.redirect("/dashboard");
    }
  );

  app.get("/user/logout", (req, res) => {
    req.logout();
    res.redirect(`/?exit=${true}`);
  });

  app.get("/api/posts", (req, res) => {
    Post.find({ isDraft: false })
      .limit(req.query.limit)
      .skip(req.skip)
      .lean()
      .sort("-date")
      .populate("tags")
      .exec((err, posts) => {
        if (err) throw err;
        Post.countDocuments({}, (err, postsCount) => {
          if (err) throw err;
          const pageCount = Math.ceil(postsCount / req.query.limit);

          res.json({
            hasMore: paginate.hasNextPages(req)(pageCount),
            posts
          });
        });
      });
  });

  // TODO: fix this function
  app.get("/api/posts/dashboard", isUserAuthenticated, (req, res) => {
    Post.find({})
      .populate("tags")
      .exec((err, posts) => {
        if (err) throw err;
        res.status(200).json(posts);
      });
  });

  app.post("/api/posts/create", isUserAuthenticated, (req, res) => {
    const { title, content, imageUrl, isDraft, tags } = req.body;
    Post.create(
      { title: title, details: content, imageUrl: imageUrl, isDraft, tags },
      (err, post) => {
        if (err) throw err;
        res.status(200).json(post);
      }
    );
  });

  app.delete("/api/posts/:slug", isUserAuthenticated, (req, res) => {
    const slug = req.params.slug;
    Post.deleteOne({ slug: slug }, err => {
      if (err) throw err;
      res.status(200).json("Success");
    });
  });

  app.post("/api/posts/:slug/update", isUserAuthenticated, (req, res) => {
    const slug = req.params.slug;
    const { title, content, imageUrl, isDraft, tags } = req.body;
    Post.updateOne(
      { slug: slug },
      { title, details: content, imageUrl, isDraft, tags },
      (err, status) => {
        if (err) throw err;
        res.status(200).json(status);
      }
    );
  });

  app.get("/api/posts/:slug", (req, res) => {
    Post.findOne({ slug: req.params.slug }, (err, post) => {
      if (err) throw err;
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json("Not found");
      }
    });
  });

  app.get("/api/tags/", (req, res) => {
    Tag.find({}, (err, tags) => {
      if (err) throw err;
      res.status(200).json(tags);
    });
  });

  app.get("/dashboard", isUserAuthenticated, (req, res) => {
    return handle(req, res);
  });

  app.get("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(PORT, err => {
    if (err) throw err;
    console.log(`Express ready on > ${PORT}`);
  });
});
