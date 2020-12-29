const express = require("express");

const app = new express();

app.get("/api/info", (req, res) => {
  res.json({
    name: "webpack",
  });
});
app.listen(9092);
