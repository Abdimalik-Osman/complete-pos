
import { useContext } from 'react';

// material
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
import { Link, Link as RouterLink } from 'react-router-dom';
// component
import Iconify from '../../../components/Iconify';
import { appContext } from '../../../context/context';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function CartWidget() {
  const {cartItems} =useContext(appContext)
  return (
    <RootStyle>
      <Link to="/dashboard/cart">
        {' '}
        <Badge showZero badgeContent={cartItems.length} color="error" max={99}>
          <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
        </Badge>
      </Link>
    </RootStyle>
  );
}
