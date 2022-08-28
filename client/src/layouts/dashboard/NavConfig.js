// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: getIcon('eva:pie-chart-2-fill'),
  // },
  {
    title: 'shop',
    path: '/dashboard/shop',
    icon: getIcon('arcticons:samsung-shop'),
  },
  {
    title: 'cart',
    path: '/dashboard/cart',
    icon: getIcon('akar-icons:cart'),
  },
  {
    title: 'products',
    path: '/dashboard/products',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'add-product',
    path: '/dashboard/add-products',
    icon: getIcon('carbon:document-add'),
  },

  {
    title: 'bills',
    path: '/dashboard/bills',
    icon: getIcon('fa6-solid:money-bill-trend-up'),
  },
  {
    title: 'reports',
    path: '/dashboard/reports',
    icon: getIcon('line-md:document-report-twotone'),
  },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
