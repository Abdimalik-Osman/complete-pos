import express from "express";
import {
  createProduct,
  readProducts,
  updateExpense,
  deleteExpense,
  createReport,
} from "../controllers/expenseControler.js";
const Router = express.Router();
Router.route("/report").get(createReport);
Router.route("/").post(createProduct).get(readProducts);
Router.route("/:id").patch(updateExpense).delete(deleteExpense);

export default Router;
