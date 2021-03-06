var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 8000;

var app = express();


app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./public"));


// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mtgTest", { useNewUrlParser: true });


app.get("/", function (req, res) {

  axios.get("https://channelfireball.com/all-strategy").then(function (response) {

    var $ = cheerio.load(response.data);


    $("h2.entry-title").each(function (i, element) {

      var result = {};
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");




      db.edhArticle.create(result)
        .then(function (dbedhArticle) {

          console.log(dbedhArticle);
        })
        .catch(function (err) {
          console.log(err);
        });
    });
    res.send("Scrape Complete");
  });
  axios.get("https://www.mtggoldfish.com/articles").then(function (response) {

    var $ = cheerio.load(response.data);


    $("h2.article-tile-title").each(function (i, element) {

      var result = {};


      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");



      // Create a new Article using the `result` object built from scraping
      db.gfArticle.create(result)
        .then(function (dbgfArticle) {
          // View the added result in the console
          console.log(dbgfArticle);
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });

  axios.get("https://old.reddit.com/r/magicTCG/").then(function (response) {

    var $ = cheerio.load(response.data);


    $("p.title").each(function (i, element) {

      var result = {};


      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      db.redditArticle.create(result)
        .then(function (dbredditArticle) {
          console.log(dbredditArticle);
        })
        .catch(function (err) {
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});


app.get("/edharticle", function (req, res) {

  db.edhArticle.find({})
    .then(function (dbedhArticle) {
      res.json(dbedhArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.get("/gfarticle", function (req, res) {

  db.gfArticle.find({})
    .then(function (dbgfArticle) {

      res.json(dbgfArticle);
    })
    .catch(function (err) {

      res.json(err);
    });
});

app.get("/redditarticle", function (req, res) {

  db.redditArticle.find({})
    .then(function (dbredditArticle) {

      res.json(dbredditArticle);
    })
    .catch(function (err) {

      res.json(err);
    });
});


app.get("/edharticle/:id", function (req, res) {

  db.edhArticle.findOne({ _id: req.params.id })

    .populate("edhnote")
    .then(function (dbedhArticle) {

      res.json(dbedhArticle);
    })
    .catch(function (err) {

      res.json(err);
    });
});

app.get("/gfarticle/:id", function (req, res) {

  db.gfArticle.findOne({ _id: req.params.id })

    .populate("edhnote")
    .then(function (dbgfArticle) {

      res.json(dbgfArticle);
    })
    .catch(function (err) {

      res.json(err);
    });
});

app.get("/redditarticle/:id", function (req, res) {

  db.redditArticle.findOne({ _id: req.params.id })

    .populate("edhnote")
    .then(function (dbredditArticle) {

      res.json(dbredditArticle);
    })
    .catch(function (err) {

      res.json(err);
    });
});


app.post("/edharticle/:id", function (req, res) {

  db.edhNote.create(req.body)
    .then(function (dbedhNote) {

      return db.edhArticle.findOneAndUpdate({ _id: req.params.id }, { note: dbedhNote._id }, { new: true });
    })
    .then(function (dbedhArticle) {
      
      res.json(dbedhArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.post("/gfarticle/:id", function (req, res) {

  db.edhNote.create(req.body)
    .then(function (dbedhNote) {

      return db.gfArticle.findOneAndUpdate({ _id: req.params.id }, { note: dbedhNote._id }, { new: true });
    })
    .then(function (dbgfArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbgfArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.post("/redditarticle/:id", function (req, res) {

  db.edhNote.create(req.body)
    .then(function (dbedhNote) {

      return db.redditArticle.findOneAndUpdate({ _id: req.params.id }, { note: dbedhNote._id }, { new: true });
    })
    .then(function (dbredditArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbredditArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
