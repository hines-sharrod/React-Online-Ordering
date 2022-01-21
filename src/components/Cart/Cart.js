import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";
import OrderForm from "./OrderForm";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [orderForm, setOrderForm] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

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

  const orderFormHandler = () => {
    setOrderForm(true);
  };

  const cartActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {cartCtx.items.length > 0 && (
        <button className={classes.button} onClick={orderFormHandler}>
          Checkout
        </button>
      )}
    </div>
  );

  const orderSubmitHandler = async (userData) => {
    setIsOrdering(true);

    await fetch(
      "https://react-online-ordering-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items
        })
      }
    );

    setIsOrdering(false);
    setOrderSubmitted(true);
    cartCtx.resetCart();
  };

  let modalContent;

  if (isOrdering) {
    modalContent = <p>Submitting Order...</p>;
  } else if (!isOrdering && !orderSubmitted) {
    modalContent = (
      <>
        {cartList}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{elegantTotalAmount}</span>
        </div>

        {orderForm && (
          <OrderForm
            hideCart={props.onHideCart}
            submitOrder={orderSubmitHandler}
          />
        )}
        {!orderForm && cartActions}
      </>
    );
  } else {
    modalContent = (
      <>
        <p style={{ textAlign: "center" }}>
          You have successfully submitted your order.
        </p>
        <div className={classes.actions}>
          <button className={classes.button} onClick={props.onHideCart}>
            Close
          </button>
        </div>
      </>
    );
  }

  return <Modal onBackdropClose={props.onHideCart}>{modalContent}</Modal>;
};

export default Cart;
