import { useContext, useState, useEffect } from 'react'
import CartContext from '../store/cart-context'
import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'

const HeaderCartButton = (props) => {
  const [isCartUpdated, setIsCartUpdated] = useState(false)
  const cartCtx = useContext(CartContext)
  const numberOfCartItems = cartCtx.items.reduce((acum, item) => {
    return acum + item.amount
  }, 0)
  const { items } = cartCtx
  useEffect(() => {
    if (items.length === 0) {
      return
    }
    setIsCartUpdated(true)

    const timer = setTimeout(() => {
      setIsCartUpdated(false)
    }, 300)
    return () => {
      clearTimeout(timer)
    }
  }, [items])

  const badgeClasses = `${classes.button} ${isCartUpdated ? classes.bump : ''}`
  return (
    <button className={badgeClasses} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
