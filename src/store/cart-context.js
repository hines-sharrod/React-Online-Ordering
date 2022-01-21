import React from "react";

// set the properties of context here so they will appear in autofill
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  resetCart: () => {}
});

export default CartContext;
