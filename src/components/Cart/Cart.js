import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";
import OrderForm from "./OrderForm";

const Cart = (props) => {
	const cartCtx = useContext(CartContext);
	const [orderForm, setOrderForm] = useState(false);

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
					Order
				</button>
			)}
		</div>
	);

	return (
		<Modal onBackdropClose={props.onHideCart}>
			{cartList}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{elegantTotalAmount}</span>
			</div>

			{orderForm && <OrderForm hideCart={props.onHideCart} />}
			{!orderForm && cartActions}
		</Modal>
	);
};

export default Cart;
