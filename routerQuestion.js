const express = require("express");
const router = express.Router();
const con = require("./ConnectSQL/serverSQL");

let maxIdQuestion = 0;

router.get("/", (req, res, next) => {
  con.query("select id_question,text from question", null, function (
    err,
    result
  ) {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/randomId/", (req, res, next) => {
  con.query(
    "SELECT id_question FROM `question` ORDER BY rand() LIMIT 1",
    null,
    function (err, result) {
      //if (err) throw err;
      res.send(result);
    }
  );
});

router.post("/", (req, res, next) => {
  const order = {
    question: req.body.question,
    answer: req.body.answer,
  };

  con.connect(function (err) {
    console.log("Connected routerQuestion!");
    var sql = "INSERT INTO `question`(`id_question`, `text`) VALUES ?";
    var values = [[null, order.question]];
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      maxIdQuestion = result.insertId;
      console.log(result.insertId);

      con.connect(function (err) {
        var sql2 =
          "INSERT INTO `answer`(`id_answer`, `answer`, `id_question`) VALUES ?";
        var values2 = [[null, order.answer, maxIdQuestion]];
        con.query(sql2, [values2], function (err, result) {
          if (err) throw err;
          console.log("Number of records inserted: " + result.affectedRows);
        });
      });

      console.log("Number of records inserted: " + result.affectedRows);
    });
  });

  res.status(200).json({
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
