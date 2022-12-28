import CartContext from '../store/cart-context'
import { useContext } from 'react'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartItem from './CartItem'

const Cart = (props) => {
  const cartCtx = useContext(CartContext)
  const onAddItemHandler = (item) => {
    cartCtx.addItem(item)
  }
  const onRemoveItemHandler = (id) => {
    cartCtx.removeItem(id)
  }
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={onAddItemHandler.bind(null, item)}
          onRemove={onRemoveItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  )
  const totalAmount = `$${cartCtx.amount.toFixed(2)}`
  const isHasItem = cartCtx.items.length !== 0

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount:</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {isHasItem && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  )
}

export default Cart
