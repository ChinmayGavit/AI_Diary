import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
  path: "./env",
});

console.log(process.env.PORT);

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.error("ERRRR", err);
    });
  })
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`The server is listening on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!!, ", err);
  });