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
// import helmet from "helmet";
// import xss from "xss-clean";
// import mongoSanitize from "express-mongo-sanitize";
const app = express();
app.use(cors());

// app.use(morgan("dev"));
app.use(express.json());
// app.use(helmet());
// app.use(xss());
// app.use(mongoSanitize());

connectDB();
// const __dirname = dirname(fileURLToPath(import.meta.url));
// app.use(express.static(path.join(__dirname, "./client/build")));

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

if(process.env.NODE_ENV==='production')
{
    app.use('/' , express.static('client/build'))
    app.get('*' , (req,res)=>{
         res.sendFile(path.resolve(__dirname , 'client/build/index.html'))
    }) 
}


// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "all/client/build", "index.html"));
// });
const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
