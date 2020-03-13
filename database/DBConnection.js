const mongoose = require("mongoose");

const DBConnection = () => {
  mongoose.connect(
    "mongodb://localhost:27017,localhost:27018,localhost:27019/faith_book",
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
      replicaSet: "rs0"
    }
  );

  const db = mongoose.connection;

  const handleOpen = () => console.log("connected to DB");
  const handleError = err => console.log(`Error on DB Connection : ${err}`);

  db.once("open", handleOpen);
  db.on("error", handleError);

  return db;
};

module.exports = DBConnection;
