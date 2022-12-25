import { useRef, useState } from 'react'
import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'

const MealItemForm = (props) => {
  const amount = useRef()
  const [isValid, setIsValid] = useState(true)
  const onSubmittinfItemHandler = (event) => {
    event.preventDefault()
    const itemAmountString = amount.current.value
    const itemAmountNumber = +itemAmountString
    if (
      itemAmountString.trim().length === 0 ||
      itemAmountNumber <= 0 ||
      itemAmountNumber > 5
    ) {
      setIsValid(false)
      return
    }
    props.onAdd(itemAmountNumber)
    setIsValid(true)
  }

  return (
    <form className={classes.form} onSubmit={onSubmittinfItemHandler}>
      <Input
        ref={amount}
        label={'Amount'}
        input={{
          id: 'ammount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!isValid && <p>Thev value you entered is not valid</p>}
    </form>
  )
}

export default MealItemForm
