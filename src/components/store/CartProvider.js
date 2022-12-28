import { useReducer } from 'react'
import CartContext from './cart-context'

const INITIAL_CART_STATE = {
  items: [],
  amount: 0,
}
const cartReducer = (state, action) => {
  let updatedItem
  let updatedItems

  if (action.type === 'ADD') {
    const updatedAmount = state.amount + action.item.amount * action.item.price
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id,
    )
    const existingItem = state.items[existingItemIndex]
    if (existingItem) {
      updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      }
      updatedItems = [...state.items]
      updatedItems[existingItemIndex] = updatedItem
    } else {
      updatedItem = { ...action.item }
      updatedItems = state.items.concat(updatedItem)
    }
    return {
      items: updatedItems,
      amount: updatedAmount,
    }
  }

  if (action.type === 'REMOVE') {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id,
    )
    const existingItem = state.items[existingItemIndex]
    const updatedAmount = state.amount - existingItem.price
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id)
    } else {
      updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      }
      updatedItems = [...state.items]
      updatedItems[existingItemIndex] = updatedItem
    }
    return {
      items: updatedItems,
      amount: updatedAmount,
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
  const removeItemFromCartHander = (id) => {
    cartDispatecher({ type: 'REMOVE', id: id })
  }

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
