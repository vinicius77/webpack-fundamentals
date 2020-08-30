const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
/* Allows Cross-Origin Resource Sharing */
app.use(cors());

app.use("/api/notes", require("./routes/api/notes"));

/*if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
