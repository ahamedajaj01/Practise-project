const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/template/index.html");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
