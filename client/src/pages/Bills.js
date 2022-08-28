import React, { useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useReactToPrint, ReactToPrint } from 'react-to-print';
import { confirm } from "react-confirm-box";


import { appContext } from '../context/context';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: '3px',
  boxShadow: 24,
  p: 4,
  padding: '12px',
  border: 'none'
};
export default function Bills() {
  const { readBill, bills, theUser,deleteBill } = React.useContext(appContext)
  const componentRef = useRef()
  const [open, setOpen] = React.useState(false);
  const [bill, setBill] = React.useState([]);
  React.useEffect(() => {
    readBill()
    console.log('call the effect hoooooooooooooook')
  }, [bills])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 

  const billinfo = (record) => {
    handleOpen()
    setBill(record)

  }
  console.log(bills)
  console.log(bill)
  const createdDate = bill.createdAt

  const toooooool = bill?.cartItems?.reduce((accu, curr) => {
    return accu + curr.item.price
  }, 0)

  console.log(toooooool)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const options = {
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel"
    }
  }
  
  const onClick = async (row) => {
     const result = await confirm(`Are you sure you want to delete ${row.waiter}`, options);
     if (result) {
       console.log("You click yes!");
       deleteBill(row._id)
       return;
     }
     console.log("You click No!");
   };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {/* <TableCell>Id</TableCell> */}
              <TableCell >Waiter name</TableCell>
              <TableCell >total items</TableCell>
              <TableCell >Total</TableCell>
              <TableCell >createdAt</TableCell>
              <TableCell >Delete</TableCell>
              <TableCell >view</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {/* <TableCell component="th" scope="row">
                {theUser._id}
              </TableCell> */}
                <TableCell >{row.waiter}</TableCell>
                <TableCell >{row.cartItems.length}</TableCell>
                <TableCell >$ {row.totalPrice}</TableCell>
                <TableCell >{row.createdAt}</TableCell>
                <TableCell > <DeleteIcon onClick={()=>onClick(row)} style={{ cursor: 'pointer' }} /> </TableCell>
                <TableCell > <RemoveRedEyeIcon style={{ cursor: 'pointer' }} onClick={() => billinfo(row)} /> </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>



      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{overflowY:'scroll'}}
      >
        <Box sx={style}   >
          <div ref={componentRef } style={{margin:'2rem'}}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid black', paddingBottom: '12px' }}>
            <h4>KSB Restuarant</h4>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <span>hodan district</span>
              <span>28Q2+2W, Mogadishu</span>
              <span>+252618292386</span>
            </div>

          </div>
          <div>
            <p> <b>Name of the waiter</b> : {bill.waiter}  </p>
            <p> <b>Table</b> : {bill.table}  </p>
            <p> <b>Date</b> : {createdDate?.toString().substring(0, 10)}  </p>
            <p className='text-center'> <b>EVC plus : {bill.numberOfRes}  </b></p>
          </div>
          <div className='table'>
            <TableContainer component={Paper} sx={{ overflowX: 'hidden' }}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>Id</TableCell> */}
                    <TableCell >Name</TableCell>
                    <TableCell >Quantity</TableCell>
                    <TableCell >Price</TableCell>

                    {/* <TableCell >total price</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bill?.cartItems?.map((row, index) => (
                    <TableRow
                      key={row.index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      {/* <TableCell component="th" scope="row">
                {theUser._id}
              </TableCell> */}
                      <TableCell >{row.item.name}</TableCell>
                      <TableCell >{row.item.quantity}</TableCell>
                      <TableCell >$ {row.item.price}</TableCell>

                      {/* <TableCell >{row.createdAt}</TableCell> */}

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '2.3rem' }}>

            <b>Total : $ {toooooool}</b>

          </div>

          <div className='text-center font-weight-bold'>thank you , hope you visit us again</div>


          </div>
          <Button  variant='contained' onClick={handlePrint}>Print Bill</Button>

        </Box>

      </Modal>

    </>
  );
}
