import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { confirm } from "react-confirm-box";
import {
  TextField,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,

} from '@mui/material';
import { appContext } from '../context/context';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius:'5px'
};

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const options = {
  labels: {
    confirmable: "Confirm",
    cancellable: "Cancel"
  }
}


export default function DenseTable() {
  const [name, setDesc] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [type, setType] = React.useState('');
  const [image, setImage] = React.useState('');
  const [id, setId] = React.useState('');
  const {expenses , readProducts ,deleteExpense , expenseType ,updateExpense , cartItems} =  React.useContext(appContext)
  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    console.log('call the effect hook')

  }, [cartItems])
  React.useEffect(()=>{
    readProducts()
  },[])

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log(expenses)

  const mow = (row)=>{
    handleOpen()
    setDesc(row.name)
    setPrice(row.price)
    setType(row.type)
    setImage(row.image)
    setId(row._id)
    
    // console.log(row)
  }
  const updatePro = (e)=>{
    e.preventDefault()
    const updatedProduct = {
      name ,price ,type ,image
    }
    updateExpense(id ,updatedProduct)
    handleClose()

  }

  const onClick = async (row) => {
    const result = await confirm(`Are you sure you want to delete ${row.name}`, options);
    if (result) {
      console.log("You click yes!");
      deleteExpense(row._id)
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
            <TableCell>name</TableCell>
            <TableCell >image</TableCell>
            <TableCell >price</TableCell>
            <TableCell >delete</TableCell>
            <TableCell >edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell >{row.name}</TableCell>
              <TableCell sx={{width:'80px'}}> <img src={row.image} alt='h'/> </TableCell>
              <TableCell  sx={{fontSize:'20px'}}> $ {row.price}</TableCell>
              <TableCell > <DeleteIcon sx={{cursor:'pointer'}}  onClick={()=>onClick(row)}/> </TableCell>
              <TableCell > <EditIcon  sx={{cursor:'pointer'}} onClick={()=>mow(row)}/> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div>
      {/* <Button>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form >
              <TextField
                label="name"
                id="outlined-start-adornment"
                sx={{ m: 1, width: '100%', marginBottom: '1.6rem' }}
                value={name}
                onChange={(e) => setDesc(e.target.value)}
                name="name "
              />
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">price</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  label="price"
                  price="price"
                />
              </FormControl>
              <TextField
                label="image"
                id="outlined-start-adornment"
                sx={{ m: 1, width: '100%', marginBottom: '1.6rem' }}
                value={image}
                onChange={(e) => setImage(e.target.value)}
                name="image "
              />

              <FormControl fullWidth sx={{ marginTop: '2rem' }}>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Age"
                  onChange={(e) => setType(e.target.value)}
                  name="expense"
                >
                  {expenseType.map((job, indx) => {
                    return (
                      <MenuItem value={job} key={indx}>
                        {' '}
                        {job}{' '}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <Box sx={{ display: 'flex', width: '100%', marginTop: '2rem', alignSelf: 'flex-end' }}>
                <Button type="submit" variant="contained" color="success" onClick={updatePro}>
                  update product
                </Button>
              </Box>
            </form>
        </Box>
      </Modal>
    </div>
    </>
  );
}
