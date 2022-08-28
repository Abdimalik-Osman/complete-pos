import { useContext, useState } from 'react';

import PropTypes from 'prop-types';
// material
import { Menu, Button, MenuItem, Typography, Grid } from '@mui/material';
import ShopProductCard from './ProductCard';
import { appContext } from '../../../context/context';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};


export default function ProductList({ products, ...other }) {
 const {cartItems} =  useContext(appContext)
  const [selected, setSelected] = useState(
  'fruits'
  )
  

  const categories = [
    {
      name: "fruits",
     
    },
    {
      name: "fastfoods",
     
    },
    {
      name: "meats",
      
    },
  ];

  return (
    <>
      <Grid container spacing={3} {...other}   sx={{ displap:'flex', alignItems: 'center', justifyContent: 'center'}}>
        {categories.map((cat)=>{
          return <MenuItem
           
       
          sx={{ typography: 'body2' ,  fontSize:'1.5rem' , displap:'flex', alignItems: 'center', justifyContent: 'center', margin:'2rem', marginBottom:'5rem' , border:'1px solid #333', borderRadius:'5px'}}
          onClick={()=>setSelected(cat.name)}
        >
          {cat.name}
        </MenuItem>
        })}
    
         </Grid>
    <Grid container spacing={3} {...other}>
      {products.filter((t)=> t.type ===selected).map((product,indx) => (
        <Grid key={indx} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
    </>
  );
}
