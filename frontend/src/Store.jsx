import React, { createContext, useReducer } from 'react';

const Store = createContext();

const initialState = {
  cartItems: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const newItem = action.payload;
      const existingItem = state.cartItems.find((x) => x.id === newItem.id);

      if (existingItem) {
        const updatedCart = state.cartItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: newItem.quantity }
            : item
        );
        return {
          ...state,
          cartItems: updatedCart,
        };
      }

      return { ...state, cartItems: [...state.cartItems, newItem] };

    case 'REMOVE_CART':
      const id = action.payload;

      const updated = state.cartItems.filter((obj) => obj.id === id);

      return { ...state, cartItems: updated };

    default:
      return state;
  }
};

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

export default Store;
