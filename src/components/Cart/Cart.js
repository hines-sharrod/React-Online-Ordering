import React, {useContext} from 'react'
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'

import classes from './Cart.module.css'

const Cart = props => {
  const cartCtx = useContext( CartContext )

  const elegantTotalAmount = '$' + cartCtx.totalAmount.toFixed( 2 )
  
  const cartItemRemoveHandler = id => {
    
  }
 
  const cartItemAddHandler = item => {

  }
  
  const cartList = cartCtx.items.map( item => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={() => cartItemRemoveHandler(item.id)}
      onAdd={() => cartItemAddHandler(item)}
    />
  ))

  return (
    <Modal onBackdropClose={props.onHideCart}>
      {cartList}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{elegantTotalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes[ 'button--alt' ]} onClick={props.onHideCart}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  )
}

export default Cart