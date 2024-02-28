// import * as dotenv from "dotenv";
import cors from "cors";
import { connectToDatabase } from "./database";
import { todoRouter } from "./todo.route";
var express = require("express");

// Load environment variables from the .env file, where the MONGO_DB_URI is configured
// dotenv.config();
const { MONGO_DB_URI } = process.env;

if (!MONGO_DB_URI) {
  console.error(
    "No MONGO_DB_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}

connectToDatabase(MONGO_DB_URI)
  .then(() => {
    var app = express();

    const corsOptions = {
      origin: "*",
      optionsSuccessStatus: 200,
    };
    app.use(cors(corsOptions));
    app.use("/", todoRouter);

    // start the Express server
    app.listen(5200, () => {
      console.log(`Server running at http://localhost:5200...`);
    });
  })
  .catch((error) => console.error(error));
