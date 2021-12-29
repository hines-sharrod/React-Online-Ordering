import React, {useContext} from 'react'

import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'
import CartContext from '../../store/cart-context'

const MealItem = props => {
  const cartCtx = useContext(CartContext)

  const addToCartHandler = amount => {
    cartCtx.addItem( {
      id: props.id,
      name: props.name,
      price: props.price,
      amount: amount
    } )    
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <span className={classes.description}>{props.desc}</span>
        <span className={classes.price}>{'$' + props.price.toFixed(2)}</span>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  )
}

export default MealItem
