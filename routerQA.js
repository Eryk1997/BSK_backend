const express = require("express");
const router = express.Router();
const con = require("./ConnectSQL/serverSQL");

router.get("/", (req, res, next) => {
  con.query(
    "SELECT question.id_question,question.text,answer.answer FROM `answer` INNER JOIN question on question.id_question=answer.id_question",
    null,
    function (err, result) {
      //if (err) throw err;
      res.send(result);
    }
  );
});

module.exports = router;
