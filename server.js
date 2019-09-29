const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/api-test");

const User = require("./models/user");

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const router = express.Router();

// router.use(function(req, res) {

// })

router.get("/", function(req, res) {
  res.json({
    message: "成功！"
  });
});
// /api/

router
  .route("/users")
  // postの処理
  .post(function(req, res) {
    const user = new User();

    user.name = req.body.name;
    user.age = req.body.age;
    user.email = req.body.email;

    user.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({
        message: "Userを作成しました"
      });
    });
  })
  .get(function(req, res) {
    User.find(function(err, users) {
      if (err) {
        res.semd(err);
      }
      res.json(users);
    });
  });
router
  .route("/users/:user_id")
  .get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  })
  .put(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) {
        res.send(err);
      }

      user.name = req.body.name;
      user.age = req.body.age;
      user.email = req.body.email;

      user.save(function(err) {
        res.json({
          message: "更新しました"
        });
      });
    });
  })
  .delete(function(req, res) {
    User.remove(
      {
        _id: req.params.user_id
      },
      function(err, user) {
        if (err) {
          res.send(err);
        }
        res.json({
          message: "削除完了！"
        });
      }
    );
  });

app.use("/api", router);

app.listen(port, () => {
  console.log("listennning!");
});
