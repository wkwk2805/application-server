function DBConnection() {
  const mongoose = require("mongoose");

  mongoose.connect("mongodb://127.0.0.1:27017/faith_book", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  const handleOpen = () => console.log("connected to DB");
  const handleError = err => console.log(`Error on DB Connection : ${err}`);

  db.once("open", handleOpen);
  db.on("error", handleError);
}

module.exports = DBConnection;
