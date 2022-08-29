
import Bills from '../modals/bills.js'


const createBill = async (req, res) => {
    const { waiter, table, totalPrice, cartItems, numberOfRes, user } = req.body;
    // if (!waiter || !table || !totalPrice || !user) {
    //     throw new Error("please providewaiter, table, totalPrice, cartItems, numberOfRes, user ");
    // }

    // req.body.createdBy = req.user.userId;
    const billInfo = await Bills.create( { waiter, table, totalPrice, cartItems, numberOfRes, user , createdBy :req.user.userId} );
    console.log(req.body);
    res.json({
        status: "success",
        data: {
            data: billInfo,
        },
    });
};
const getBills = async (req, res) => {
   
    const billInfo = await Bills.find({createdBy:req.user.userId}).sort({createdAt:-1})
    console.log(req.body);
    res.json({
        status: "success",
        data: {
            data: billInfo,
        },
    });
};

const deleteBill = async (req, res) => {
    const id = req.params.id;
    console.log(`jjjjjjjjjjjjjjjjjj${id}`);
    const bill = await Bills.findOne({ _id: id });
    if (!bill) {
      throw new Error("bill not found ");
    }
  
    await Bills.findByIdAndDelete(id);
    res.json({
      status: "success",
      msg: "delted successfully",
    });
  };


export  {createBill ,getBills ,deleteBill}