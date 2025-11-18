const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const path = require("path");


const app = express();
const port = 5000; 


app.use(cors());
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname)));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});



app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
