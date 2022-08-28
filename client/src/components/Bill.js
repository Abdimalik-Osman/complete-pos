import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { appContext } from '../context/context';

const Bill = ({ handleClose }) => {
    const [waiter, setWaiter] = useState('');
    const [table, setTable] = useState('');
    const navigate = useNavigate()

    const { cartItems  ,createBill , removeFromCartitems} = useContext(appContext);

    const tables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const totalPrice = cartItems.reduce((accu, curr) => {
        return accu + curr.item.price
    }, 0)
    const numberOfRes = `*789*618292386*${totalPrice}#`
    const user = JSON.parse(localStorage.getItem('user'))

    const submitBill = (e) => {
        e.preventDefault()
        const billInfo = {
            waiter, table, totalPrice, cartItems, numberOfRes , user
        }
        // console.log(billInfo)
        createBill(billInfo)
        setWaiter('')
        setTable('')
        removeFromCartitems()
        handleClose()
        navigate('/dashboard/bills')

    }

    console.log(user)
    return (
        <div>
            <h5>Charge bill</h5>
            <form onSubmit={submitBill}>
                <TextField
                    label="waiter name"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '100%', }}
                    value={waiter}
                    onChange={(e) => setWaiter(e.target.value)}
                    name="waiter "
                />



                <FormControl fullWidth sx={{ marginTop: '2rem' }}>
                    <InputLabel id="demo-simple-select-label">Table</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={table}
                        label="table"
                        onChange={(e) => setTable(e.target.value)}
                        name="table"
                    >
                        {tables.map((job, indx) => {
                            return (
                                <MenuItem value={job} key={indx}>
                                    {' '}
                                    {job}{' '}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>

                <div style={{ fontSize: '25px', marginTop: '1rem' }}>
                    Grand Total : <span >$ {totalPrice} </span>
                </div>
                <Box sx={{ display: 'flex', width: '100%', marginTop: '2rem', alignSelf: 'flex-end' }}>
                    <Button type="submit" variant="contained" color="success">
                        Generate bill
                    </Button>
                </Box>
            </form>
        </div>
    )
}

export default Bill