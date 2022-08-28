import * as React from 'react';
import { Button, Grid } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DatePicker } from '@mui/lab';

import moment from 'moment'
import { appContext } from '../context/context';



const Reports = () => {
  const [todaysales, setTodaysale] = useState([])
  const { theUser, expenses, readProducts, readBill, bills } = useContext(appContext);

  const navigate = useNavigate();
  // const [value, setValue] = React.useState(dayjs('2014-08-18'));
  const [value, setValue] = React.useState(dayjs('2022-08-22'));
  const [actual, setActual] = React.useState(null);

const formattedDate = moment(value).format('YYYY-MM-DD');

  const handleChange = (newValue) => {
    setValue(newValue.format('YYYY-MM-DD'));
  };


console.log(value )

  // console.log(theUser);
  useEffect(() => {
    if (!theUser) {
      navigate('/register');
    }
  }, [theUser]);

  useEffect(() => {
    readProducts();
    readBill()
  }, []);
  const date = new Date();
  const currentdate = `${date.getFullYear()}-${String((date.getMonth() + 1)).padStart(2, '0')}-${date.getDate()}`;
  // console.log(currentdate)

const current = '2022-08-27'
  // console.log(filtered)

  const todayReport = () => {
    const filtered = bills.filter((bill) => {
      // console.log(bill.createdAt.substring(0, 10))
      return bill.createdAt.substring(0, 10) === value
    })
    setTodaysale(filtered)

  }
// console.log(todaysales)


 const totalTransantionOfTodau =  todaysales?.reduce((accu, curr)=>{
  return accu + curr.totalPrice
},0)

  return <>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <h3>Genarate Today's sales report</h3>
    <Button variant='contained' onClick={todayReport}>Generate report</Button>
  </div>

  <Grid container spacing={2} style={{padding:'25px'}}>

  {/* <Grid item xs={6}>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
        label="From"
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        
        
      </Stack>
    </LocalizationProvider>
  </Grid> */}
  <Grid item xs={6}>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="pick the date you want"
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
 
  </Grid>
  
    </Grid>
{todaysales.length >=1 &&
<>
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>_id</TableCell>
            <TableCell>waiter naem</TableCell>
            <TableCell>items sold</TableCell>
            <TableCell>total price of that transaction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todaysales.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell >{row._id}</TableCell>
              <TableCell >{row.waiter}</TableCell>
              <TableCell ><b> { row.cartItems.length} </b> {row.cartItems.length >1?'items':'item'} </TableCell>
              <TableCell >$ {row.totalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    <div style={{ display:'flex', justifyContent:'center', alignItems: 'center',marginTop: '1rem'}}>
      <h4 color='primary'>Today's total transaction is ${totalTransantionOfTodau}</h4>
    </div>
    </>
    }
  ;
  </>
};

export default Reports;
