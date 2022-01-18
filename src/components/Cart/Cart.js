import React, { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";
import OrderForm from "./OrderForm";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const elegantTotalAmount = "$" + parseFloat(cartCtx.totalAmount.toFixed(2));

  const cartList = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={() => cartCtx.removeItem(item.id)}
      onAdd={() => cartCtx.addItem({ ...item, amount: 1 })}
    />
  ));

  return (
    <Modal onBackdropClose={props.onHideCart}>
      {cartList}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{elegantTotalAmount}</span>
      </div>
      <OrderForm />
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {cartCtx.items.length > 0 && (
          <button className={classes.button}>Order</button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
