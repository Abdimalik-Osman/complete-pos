import { Children, createContext, useReducer } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { reducer } from './reducer';
import Alert from '../components/Alert';

const REGISTER_BEGIN = 'REGISTER_BEGIN';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_ERROR = 'REGISTER_ERROR';
const LOGIN_USER_BEGIN = 'LOGIN_USER_BEGIN';
const LOGIN_USER_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_USER_ERROR = 'LOGIN_ERROR';
const HIDE_ALERT = 'HIDE_ALERT';
const LOGUT_USER = 'LOGUT_USER';

const GET_EXPENSES_SUCCESS = 'GET_EXPENSES_SUCCESS';
const addToLocalStorage = (user, token) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
};

const removeFromLocalStorage = () => {
  localStorage.setItem('user', '');
  localStorage.setItem('token', '');
};

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const cartItems = localStorage.getItem('cart');
console.log(user, token);
const initialState = {
  showAlert: false,
  theUser: user ? JSON.parse(user) : null,
  token: token || null,
  isLoading: false,
  alertType: '',
  alertText: '',
  expenseType: ['fruits', 'fastfoods', 'meats'],
  expenses: [],
  cartItems: cartItems ? JSON.parse(cartItems) : [],
  editExpenseId: '',
  bills:[]
};
export const appContext = createContext();

console.log(user);
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  axios.defaults.headers.common.Authorization = `Bearer ${state.token}`;

  const authFetch = axios.create({
    baseURL: 'http://localhost:9000/api/v1/',
  });

  authFetch.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      config.headers.common.Authorization = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        console.log('not authorised');
        // logout();
      }
      return Promise.reject(error);
    }
  );

  // ---------------------------register user ------------------------------ //
  const registerUser = async (user) => {
    dispatch({ type: REGISTER_BEGIN });
    console.log(user);

    try {
      const {
        data: {
          data: { data, token },
        },
      } = await authFetch.post(`auth/register`, user);

      console.log(data, token);
      console.log(data);
      addToLocalStorage(data, token);
      dispatch({ type: REGISTER_SUCCESS, payload: { data, token } });
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({ type: REGISTER_ERROR, payload: { msg: error.response.data.msg } });
    }
  };

  // ------------------------------login user ------------------------------ //

  const loginUser = async (loginInfo) => {
    dispatch({ type: LOGIN_USER_BEGIN });

    try {
      const {
        data: { data },

        msg,
      } = await axios.post('http://localhost:9000/api/v1/auth/login', loginInfo);

      const res = data.data;
      const token = data.token;
      console.log(res);
      addToLocalStorage(res, token);

      dispatch({ type: LOGIN_USER_SUCCESS, payload: { res, token } });
      // dispatch({ type: REGISTER_SUCCESS, payload: { data, token } });
      console.log('working');
    } catch (error) {
      dispatch({ type: LOGIN_USER_ERROR, payload: { msg: error.response.data.msg } });

      console.log(error.response.data.msg);
    }

    console.log('user login in');
  };

  // ------------------------------ create expense ------------------------------ //

  const createProduct = async (product) => {
    console.log(product);
    dispatch({ type: 'CREATE_EXPENSE_BEGIN' });
    try {
      const expenso = await authFetch.post('products/', product);
      dispatch({ type: 'CREATE_EXPENSE_SUCCESS' });
      console.log(expenso);
    } catch (error) {
      dispatch({ type: 'CREATE_EXPENSE_ERROR', payload: { msg: error.response.data.msg } });
      console.log(error);
    }
  };



  const createBill = async (bill) => {
    console.log(bill);
    dispatch({ type: 'CREATE_BILL_BEGIN' });
    try {
      const BIILS = await authFetch.post('/bills', bill);
      dispatch({ type: 'CREATE_BILL_SUCCESS' });
      console.log(BIILS);
    } catch (error) {
      dispatch({ type: 'CREATE_BILL_ERROR', payload: { msg: error.response.data.msg } });
      console.log(error);
    }
  };

  // ------------------------------ get expenses ------------------------------ //

  const readProducts = async () => {
    try {
      const {
        data: {
          data: { data },
        },
      } = await authFetch.get('products/');
      // console.log(data);
      dispatch({ type: GET_EXPENSES_SUCCESS, payload: { data } });
      console.log('.......................');
    } catch (error) {
      console.log(error.message);
    }
  };
  const notify = () => toast('Wow so easy!');

  const deleteExpense = async (id) => {
    try {
      notify();
      await authFetch.delete(`products/${id}`);

      readProducts();
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteBill = async (id) => {
    try {
      notify();
      await authFetch.delete(`bills/${id}`);

      readBill();
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateExpense = async (id, theExpense) => {
    try {
      await authFetch.patch(`products/${id}`, theExpense);

      dispatch({ type: 'UPDATED_EXPENSE' });
      readProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // ------------------------------hide alert ------------------------------ //
  const hideAlert = () => {
    setTimeout(() => {
      dispatch({ type: HIDE_ALERT });
    }, 3000);
  };

  
  const logutUser = () => {
    dispatch({ type: LOGUT_USER });
    removeFromLocalStorage();
    // removeCartItems()
  };
  const removeFromCartitems = () => {
    dispatch({ type: 'REMOVE__FROM__CART' });
    localStorage.setItem('cart',[''])
  };
  const clearAll = () => {
    dispatch({ type: 'clearAll' });
  };

  
  const addToBasket = (item) => {
    console.log(item)
    dispatch({ type: "ADD_TO_BASK", payload: { item } });

  }
  // const addCartToLocalStroge = ()=>{
  //   localStorage.setItem('cart', JSON.stringify(state.cartItems));

  // }
  const updateCart = (record) => {
    console.log(record)
    dispatch({ type: 'UPDATED_CART', payload: { record } });

  }
  const removeFromCart = (id) => {
    console.log(id)
    dispatch({ type: 'REMOVE_CART', payload: { id } });
  }

  const readBill = async () => {
    try {
      const {
        data: {
          data: { data },
        },
      } = await authFetch.get('bills/');
      // console.log(data);
      dispatch({ type: "GET_BILLS", payload: { data } });
      console.log('.......................');
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <appContext.Provider
      value={{
        ...state,
        registerUser,readBill,
        hideAlert,
        logutUser,
        loginUser,
        createProduct,
        readProducts,
        deleteExpense,
        updateExpense, addToBasket, updateCart, removeFromCart, createBill ,clearAll ,removeFromCartitems,deleteBill
      }}
    >
      {' '}
      {children}{' '}
    </appContext.Provider>
  );
};
