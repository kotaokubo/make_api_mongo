// 必要なモジュールをインポート
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// dbをurl変数に格納
const url = "mongodb://localhost:27917/";
let db;

// connectメソッドを用いてdbに接続
MongoClient.connect(url, function(err, mongodb) {
  assert.equal(null, err);
  console.log("初めてのAPIサーバーが起動しました！おめでとう！");

  // 明示的にdbの名称を引数に与える
  db = mongodb.db("test");
});

var collection = function(name) {
  return db.collection(name);
};

// collection関数をexport
module.exports = collection;
