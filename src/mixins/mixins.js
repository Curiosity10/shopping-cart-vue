export default {
  methods: {
    addToCart (product) {
      const cart = JSON.parse(localStorage.getItem('cart')) || []
      if (cart.length === 0) {
        const item = {
          id: product._id,
          name: product.name,
          price: product.price,
          subtotal: product.price * 1,
          qty: 1
        }
        cart.push(item)
        this.$store.commit('setCart', item)
        localStorage.setItem('cart', JSON.stringify(cart))
      } else {
        const item = cart.find(item => {
          return item.id === product._id
        })
        if (item) { // check if is not new item
          item.qty++
          item.subtotal = item.price * item.qty
          this.$store.commit('setQuantity', item)
          this.$store.commit('setPrice', item)
          localStorage.setItem('cart', JSON.stringify(cart))
        } else {
          const item = {
            id: product._id,
            name: product.name,
            price: product.price,
            subtotal: product.price * 1,
            qty: 1
          }
          cart.push(item)
          this.$store.commit('setCart', item)
          localStorage.setItem('cart', JSON.stringify(cart))
        }
      }
    }
  }
}
