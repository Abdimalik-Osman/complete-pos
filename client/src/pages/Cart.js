import * as React from 'react';
import { Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
// web.cjs is required for IE11 support
import { confirm } from "react-confirm-box";


import { Button } from '@mui/material';

import { appContext } from '../context/context';
import Bill from '../components/Bill';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius:'2px',
  boxShadow: 24,
  p: 4,
};

export default function CustomizedTables() {
  const {cartItems , updateCart,removeFromCart , clearAll}= React.useContext(appContext)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)
  console.log(cartItems)
    React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    console.log('call the effect hook')

  }, [cartItems])
  const increaseQuantity = (record)=>{
    updateCart(record)
    
    console.log(record)
    
  }
//   const deleteFromCart = (row)=>{
//     removeFromCart(row.id)
// console.log(row)
//   }
  // console.log(cartItems)


const options = {
  labels: {
    confirmable: "Confirm",
    cancellable: "Cancel"
  }
}

const onClick = async (row) => {
   const result = await confirm(`Are you sure you want to delet ${row.item.name}`, options);
   if (result) {
     console.log("You click yes!");
     removeFromCart(row.item._id)
     return;
   }
   console.log("You click No!");
 };
const clearConfirm = async (row) => {
   const result = await confirm(`Are you sure you want to delete all items in the cart`, options);
   if (result) {
     console.log("You click yes!");
     clearAll()
     return;
   }
   console.log("You click No!");
 };

  const totalPrice= cartItems.reduce((accu, curr)=>{
    return accu + curr.item.price
  },0)
  console.log(totalPrice)
  return (
    <>
    {cartItems.length >0 ? (<TableContainer component={Paper}>
      <Button  variant="outlined" color="error" style={{marginBottom:'20PX'}} onClick={()=>clearConfirm()}>clear all</Button>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >name</StyledTableCell>
            <StyledTableCell>image</StyledTableCell>
            <StyledTableCell >quantity</StyledTableCell>
            <StyledTableCell >price</StyledTableCell>
            <StyledTableCell > Delete </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((row, index) => (
            <StyledTableRow key={index}>
              {/* <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell> */}
              <StyledTableCell  style={{fontSize:'20px'}}>{row.item.name}</StyledTableCell>
              <StyledTableCell > <img src={row.item.image} alt='f' style={{width:'80px'}}/> </StyledTableCell>
              <StyledTableCell >  <AddIcon sx={{ fontSize: "35px" , cursor: 'pointer' }} onClick={()=>increaseQuantity(row)}/> {row.item.quantity} <RemoveIcon sx={{ fontSize: "35px" , cursor: 'pointer' }}/>     </StyledTableCell>

              <StyledTableCell sx={{ fontSize: "50px"  }}>$ {row.item.price}</StyledTableCell>
              <StyledTableCell > <DeleteIcon sx={{ cursor:'pointer' }} onClick={() => onClick(row)}/> </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>):<h4 style={{textAlign:'center', fontFamily:'cursive' ,display:'flex', alignItems:'center', justifyContent: 'center'}}>you have no items in your cart, to add items go to    <Link to='/dashboard/shop' style={{color:'black', textUnderline:'none', paddingLeft:'10px' , paddingRight:'10px'}}> shopping   </Link>  page </h4>}
    
    {cartItems.length > 0 && <hr/>}
   {cartItems.length >0 &&  <div style={{display:'flex',justifyContent: 'flex-end' , alignItems:'flex-end', marginTop:'20px', fontSize:'1.6rem' ,marginRight:'25px', flexDirection:'column'}}>
      Total price : $ {totalPrice}
      <Button variant="contained" sx={{marginTop:'20px'}}  onClick={handleOpen}> Charge bill </Button>
    </div>}

    <div>
      
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
         <Bill handleClose={handleClose}/>
        </Box>
      </Modal>
    </div>
    </>
  );
}
