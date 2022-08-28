import { Action } from 'history';

const REGISTER_BEGIN = 'REGISTER_BEGIN';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_ERROR = 'REGISTER_ERROR';
const HIDE_ALERT = 'HIDE_ALERT';
const LOGUT_USER = 'LOGUT_USER';

const LOGIN_USER_BEGIN = 'LOGIN_USER_BEGIN';
const LOGIN_USER_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_USER_ERROR = 'LOGIN_ERROR';

const GET_EXPENSES_SUCCESS = 'GET_EXPENSES_SUCCESS';
export const reducer = (state, action) => {


  if (action.type === 'REMOVE_CART') {
    console.log(state.cartItems[0].item)
    const newBasket = [...state.cartItems];
    // console.log(newBasket)
    const index = state.cartItems.findIndex((bas) => bas.item._id === action.payload.id);
    console.log("11111111111111", index);
    if (index >= 0) {
      newBasket.splice(index, 1);
      console.log(newBasket);
      console.log('it is happening');
    } else {
      console.log("index does not exists");
    }

    return { ...state, cartItems: newBasket };
  }


  if (action.type === "ADD_TO_BASK") {
    return {
      ...state, cartItems: [...state.cartItems, action.payload]
    }
  }

  // state.cartItems.map((item)=>{
  //   console.log(item.quantity)
  //   return item
  // })
  // if(action.type === 'UPDATED_CART'){
  //   // console.log(state.cartItems[0].quantity)

  //   return {
  //     ...state , 
  //     cartItems: state.cartItems.map((item)=> item._id === action.payload.record._id ?{...item ,quantity:item.quantity +1 }:item)
  // }

  // }


  if (action.type === 'REMOVE__FROM__CART') {
    return {
      ...state, cartItems: []
    }
  }
  if (action.type === 'clearAll') {
    return {
      ...state, cartItems: []
    }
  }





  if (action.type === 'GET_BILLS') {
    return {
      ...state,
      bills: action.payload.data
    };
  }



  if (action.type === HIDE_ALERT) {
    return { ...state, showAlert: false };
  }
  if (action.type === GET_EXPENSES_SUCCESS) {
    return {
      ...state,
      expenses: action.payload.data,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      theUser: action.payload.res,
      token: action.payload.token,
      // alertType: 'success',
      // alertText: 'user login successfully , redirecting...',
      // showAlert: true,
    };
  }

  if (action.type === 'UPDATED_EXPENSE') {
    return {
      ...state,
      // showAlert: true,
      // alertText: 'updated successfully',
      // alertType: 'success',
    };
  }
  if (action.type === 'CREATE_EXPENSE_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      // showAlert: true,
      // alertType: 'success',
      // alertText: 'succefully created product',
    };
  }
  if (action.type === 'CREATE_BILL_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'succefully created bill',
    };
  }


  // if (action.type === 'REMOVE_CART_ITEMS') {
  //   return {
  //     ...state,
  //    cartItems:['']
  //   };
  // }

  if (action.type === LOGUT_USER) {
    return { ...state, theUser: null, token: null };
  }
  if (action.type === REGISTER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === REGISTER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      theUser: action.payload.data,
      token: action.payload.token,
      alertType: 'success',
      // alertText: 'user created successfully , redirecting...',
      // showAlert: true,
    };
  }

  if (REGISTER_ERROR) {
    return {
      ...state,
      isLoading: false,
      // alertType: 'danger',
      // alertText: 'there was an error',
      // showAlert: true,
    };
  }


  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === LOGIN_USER_ERROR) {
    return { ...state, alertType: 'danger', alertText: action.payload.msg };
  }

  if (action.type === 'CREATE_EXPENSE_BEGIN') {
    return { ...state, isLoading: true };
  }
  if (action.type === 'CREATE_BILL_BEGIN') {
    return { ...state, isLoading: true };
  }

  // if (action.type === 'CREATE_EXPENSE_ERROR') {
  //   return {
  //     ...state,
  //     showAlert: true,
  //     alertType: 'danger',
  //     alertText: action.payload.msg,
  //   };
  // }
  if (action.type === 'CREATE_BILL_ERROR') {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }



  return state;
};









