const express = requier("express");
const router = express.Router();
const ObjectID = require("mongodb").ObjectID;
// MongoDB用のファイルを指定
const collection = require("../mongo");
const collectionName = "api";

router.all("*/", function(req, res, next) {
  res.contentType("json");
  res.header("Access-Contorl-Allow-Origin", "*");
  next();
});

// localhost:3000/api/(object id)にアクセスした際
router.get("/:id", function(req, res) {
  collection(collectionName).findOne(
    { _id: new ObjectID(req.params.id) },
    {},
    function(err, r) {
      res.send(r);
    }
  );
});

// postメソッド
router.post("/", function(req, res) {
  collection(collectionName)
    .insertOne(req.body)
    .then(function(r) {
      res.send(r);
    });
});

// putメソッド
router.put("/:id", function(req, res) {
  collection(collectionName).findOneAndUpdate(
    { _id: new ObjectID(req.params.id) },
    req.body,
    {},
    function(err, r) {
      res.send(r);
    }
  );
});

// deleteメソッド
router.delete("/:id", function(req, res) {
  collection(collectionName).findOneAndDelete(
    { _id: new ObjectID(req.params.id) },
    {},
    function(err, r) {
      res.send(r);
    }
  );
});

module.exports = router;
