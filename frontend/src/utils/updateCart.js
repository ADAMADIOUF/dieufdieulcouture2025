export const addDecimals = (num) => {
  if (num % 1 === 0) {
    return num.toString()
  }
  return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = (state) => {
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  state.shippingPrice = state.itemsPrice > 100 ? 0 : 10

  state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice))

  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(0)
  localStorage.setItem('cart', JSON.stringify(state))

  return state
}
