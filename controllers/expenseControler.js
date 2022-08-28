import productModal from "../modals/expense.js";

const createProduct = async (req, res) => {
  const { name, price, type, image } = req.body;
  if (!name || !price || !type || !image) {
    throw new Error("please provide a name and price");
  }

  req.body.createdBy = req.user.userId;
  const productInfo = await productModal.create(req.body);
  console.log(req.body);
  res.json({
    status: "success",
    data: {
      data: productInfo,
    },
  });
};
const readProducts = async (req, res) => {
  const products = await productModal.find({});
  res.json({
    status: "success",
    data: {
      data: products,
      numProducts: products.length,
    },
  });
};
const updateExpense = async (req, res) => {
  const id = req.params.id;
  console.log(`uppppppppppppppppp ${id}`);
  const { name, price, image  } = req.body;
  if (!name || !price || !image) {
    throw new Error("please provide a name , image");
  }

  const expenseInfo = await productModal.findOne({ _id: id });

  if (!expenseInfo) {
    throw new Error("product  not found");
  }

  const updatedExpense = await productModal.findByIdAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );

  res.json({
    status: "success",
    data: {
      updatedExpense,
    },
  });
};
const deleteExpense = async (req, res) => {
  const id = req.params.id;
  console.log(`jjjjjjjjjjjjjjjjjj${id}`);
  const expense = await productModal.findOne({ _id: id });
  if (!expense) {
    throw new Error("Expense not found ");
  }

  await productModal.findByIdAndDelete(id);
  res.json({
    status: "success",
    msg: "delted successfully",
  });
};

const createReport = async (req, res) => {
  try {
    const stats = await productModal.aggregate([
      // { $match: { "expense.income": { $gt: 1 } } },
      {
        $group: {
          _id: null,
          expenseTotal: { $sum: "$expense.income " },
        },
      },
    ]);

    res.status(200).json({
      status: "suc",
      data: stats,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      data: "failllllllllllled",
    });
  }
};

export {
  createProduct,
  readProducts,
  updateExpense,
  deleteExpense,
  createReport,
};
