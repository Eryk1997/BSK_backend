const express = require("express");
const router = express.Router();
const con = require("./ConnectSQL/serverSQL")
/*var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "new",
});
*/
router.get("/", (req, res, next) => {
  con.query("select text from question", null, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.post("/", (req, res, next) => {
  const order = {
    question: req.body.question,
  };

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO `question`(`id_question`, `text`) VALUES ?";
    var values = [[null, order.question]];
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });

  res.status(201).json({
    message: "Question was created",
  });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  con.query("select text from question where id_question=?", id, function (
    err,
    result
  ) {
    if (err) throw err;
    var text = result[0].text;
    var pom = { id_question: id, text: text };
    res.send(pom);
  });
});

router.patch("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "Updated product!",
  });
});

router.delete("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "Deleted product!",
  });
});

module.exports = router;
