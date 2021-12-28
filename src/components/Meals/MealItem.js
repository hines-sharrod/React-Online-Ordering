import React from 'react'

import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'

const MealItem = props => {
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <span className={classes.description}>{props.desc}</span>
        <span className={classes.price}>{'$' + props.price.toFixed(2)}</span>
      </div>
      <div>
        <MealItemForm id={props.id} />
      </div>
    </li>
  )
}

export default MealItem
