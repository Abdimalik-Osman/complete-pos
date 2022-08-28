import React, { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { appContext } from '../context/context';
import Alert from '../components/Alert';

const AddExpense = () => {
  const [name, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const { expenseType, showAlert, createProduct, getExpenses, hideAlert } = useContext(appContext);

  const handlerExpense = (e) => {
    e.preventDefault();

    if (!name || !type || !price) {
      return;
    }
    const expenseinfo = { name, price, type, image };
    // console.log(expenseinfo);
    toast.success('product created succefully')

    createProduct(expenseinfo);
    // hideAlert();
    setDesc('');
    setPrice('');
    setType('');
    setImage('');
  };
  return (
    <Container>
      <Box>
        <ToastContainer />
        {' '}
        <Typography variant="h4"> add new product </Typography>{' '}
        <div>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column ',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '2rem',
            }}
          >
            {showAlert && <Alert />}
            <form onSubmit={handlerExpense}>
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
                <Button type="submit" variant="contained" color="success">
                  add new product
                </Button>
              </Box>
            </form>
          </Box>
        </div>
      </Box>
    </Container>
  );
};

export default AddExpense;
