import React, {useContext, useEffect, useState} from 'react'

import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from '../../store/cart-context'

const HeaderCartButton = props => {
  const [animateButton, setAnimateButton] = useState(false)
  const cartCtx = useContext( CartContext )

  const numberOfCartItems = cartCtx.items.reduce( ( total, item ) => {
    return total + item.amount
  }, 0 )
  
  const btnClasses = `${classes.button} ${animateButton ? classes.bump : ''}`

  useEffect( () => {
    if ( cartCtx.items.length === 0 ) {
      return
    }

    setAnimateButton( true )
    
    const timer = setTimeout( () => {
      setAnimateButton(false)
    }, 300 )
    
    return () => {
      clearTimeout(timer)
    }

  }, [cartCtx.items])
  
  return (
    <button className={ btnClasses } onClick={props.onShowCart}>
      <span className={ classes.icon } >
        <CartIcon />
      </span>
      <span>
        Your Cart
      </span>
      <span className={ classes.badge }>
        {numberOfCartItems}
      </span>
    </button >
  )
}

export default HeaderCartButton
