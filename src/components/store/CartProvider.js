import { useReducer } from 'react'
import CartContext from './cart-context'

const INITIAL_CART_STATE = {
  items: [],
  amount: 0,
}
const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const newAmount = state.amount + action.item.amount * action.item.price
    const newItems = state.items.concat(action.item)
    return {
      items: newItems,
      amount: newAmount,
    }
  }
  return INITIAL_CART_STATE
}

const CartProvider = (props) => {
  const [cartStete, cartDispatecher] = useReducer(
    cartReducer,
    INITIAL_CART_STATE,
  )
  const addItemToCartHandler = (item) => {
    cartDispatecher({ type: 'ADD', item: item })
  }
  const removeItemFromCartHander = (id) => {}

  const cartContext = {
    items: cartStete.items,
    amount: cartStete.amount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHander,
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
