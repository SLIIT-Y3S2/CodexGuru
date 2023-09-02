import mongoose, { connect } from "mongoose";

const dbConnect = () => {
  mongoose
    .connect("mongodb://localhost:27017/codexguru", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      console.log("Could not connect to the database. Exiting now...", err);
      process.exit();
    });
};
export default dbConnect;
