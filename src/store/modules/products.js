export default {
  state: {
    cart: JSON.parse(localStorage.getItem('cart')) || []
  },
  mutations: {
    setCart: (state, payload) => {
      state.cart.push(payload)
    },
    setQuantity: (state, payload) => {
      const item = state.cart.find((product) => {
        return product.id === payload.id
      })
      item.qty = payload.qty
    },
    setPrice: (state, payload) => {
      const item = state.cart.find((product) => {
        return product.id === payload.id
      })
      item.subtotal = payload.subtotal
    },
    clearCart: (state) => {
      state.cart = []
    }
  },
  getters: {
    getCart: state => state.cart
  }
}
