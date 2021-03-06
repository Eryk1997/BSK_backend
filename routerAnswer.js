const express = require("express");
const router = express.Router();
const con = require("./ConnectSQL/serverSQL")

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Question were fetched",
  });
});

router.post("/", (req, res, next) => {
  const order = {
    question: req.body.question,
    id_question: req.body.id_question,
  };

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      "INSERT INTO `answer`(`id_answer`, `answer`, `id_question`) VALUES ?";
    var values = [[null, order.question, order.id_question]];
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

  con.query(
    "SELECT answer FROM answer INNER JOIN question on question.id_question=answer.id_question where answer.id_question=?",
    id,
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.patch("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "Updated product!",
  });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;

  con.query("DELETE FROM `answer` WHERE answer.id_question = ?", id, function (
    err,
    result
  ) {
    //if (err) throw err;
    //res.send(result);
  });
  con.query("DELETE FROM `question` WHERE question.id_question = ?", id, function (
    err,
    result
  ) {
    //if (err) throw err;
    //res.send(result);
  });

  res.status(200).json({
    message: "Deleted product!",
  });
});

module.exports = router;
