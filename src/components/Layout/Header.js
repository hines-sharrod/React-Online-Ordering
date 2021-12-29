import React from 'react'

import mealsImg from '../../assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'

const Header = props => {
  return (
    <>
      <header className={ classes.header }>
        <h1>React Meals</h1>
        <HeaderCartButton onShowCart={props.onShowCart} />
      </header>
      <div className={ classes[ 'main-image' ] }>
        <img src={ mealsImg } alt="Food assorted on a table" />
      </div>
    </>
  )
}

export default Header
