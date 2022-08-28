import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import "express-async-errors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRouter.js";
import expenseRouter from "./routes/expenseRouter.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";
import authorization from "./middleware/auth.js";
import bill from "./routes/bills.js";

dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(cors());

// app.use(morgan("dev"));
app.use(express.json());


connectDB();
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", authorization, expenseRouter);
app.use("/api/v1/bills", authorization, bill);
console.log("hello");

app.get("/g", (req, res) => {
  res.json({ msg: "yes you can fetch data" });
});

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})




const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
