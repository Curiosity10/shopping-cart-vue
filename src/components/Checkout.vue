<template>
  <v-container>
    <section class="checkout mt-3">
      <v-data-table
        :headers="headers"
        :items="cart"
        hide-actions
        class="elevation-1 hidden-sm-and-down"
      >
        <template
          slot="headerCell"
          slot-scope="props"
        >
          <v-tooltip bottom>
            <span
              slot="activator"
              class="table_header"
            >
              {{ props.header.text }}
            </span>
            <span class="table_header">
              {{ props.header.text }}
            </span>
          </v-tooltip>
        </template>

        <template
          slot="items"
          slot-scope="props">
          <td class="table_item table_item__title">{{ props.item.name }}</td>
          <td class="table_item text-xs-left">${{ props.item.price }}</td>
          <td class="table_item text-xs-center">{{ props.item.qty }}</td>
          <td class="table_item text-xs-left">${{ props.item.subtotal }}</td>
          <td class="table_item table_cell table_btns">
            <v-btn
              small
              fab
              color="success"
              class="table_item btns align-content-center"
              @click="action('min',props.item)">
              <span>-</span>
            </v-btn>
            <v-btn
              small
              color="error"
              class="table_item btns"
              @click="action('clear',props.item)">
              <v-icon medium>delete_forever</v-icon>
            </v-btn>
            <v-btn
              small
              fab
              color="success"
              class="table_item btns"
              @click="action('add',props.item)">
              <span>+</span>
            </v-btn>
          </td>
        </template>

        <template slot="footer">
          <td colspan="100%">
            <h4 class="checkout_total mt-3 mb-4">Total: ${{ total }}</h4>
            <v-btn
              :disabled="cart.length === 0"
              color="info"
              dark
              @click.stop="dialog = true">Checkout</v-btn>
          </td>
        </template>

        <template slot="no-data">
          <v-alert
            :value="true"
            color="error"
            icon="warning">
            Sorry, nothing to display here :(
          </v-alert>
        </template>

      </v-data-table>

      <div
        v-if="cart.length > 0"
        class="hidden-md-and-up">
        <div
          v-for="item in cart"
          :key="item.name"
          class="card_item-xs">
          <p class="item-xs_title">{{ item.name }}</p>
          <p>Subtotal: ${{ item.subtotal }}</p>
          <p>Quantity: {{ item.qty }}</p>
          <div>
            <v-btn
              small
              fab
              color="success"
              class="table_item btns align-content-center"
              @click="action('min',item)">
              <span>-</span>
            </v-btn>
            <v-btn
              small
              color="error"
              class="table_item btns"
              @click="action('clear',item)">
              <v-icon medium>delete_forever</v-icon>
            </v-btn>
            <v-btn
              small
              fab
              color="success"
              class="table_item btns"
              @click="action('add',item)">
              <span>+</span>
            </v-btn>
          </div>
        </div>
        <h4 class="checkout_total mt-3 mb-4">Total: ${{ total }}</h4>
        <v-btn
          color="info"
          dark
          @click.stop="dialog = true">Checkout</v-btn>
      </div>

      <div
        v-else
        class="hidden-md-and-up">
        <v-alert
          :value="true"
          color="error"
          icon="warning">
          Sorry, nothing to display here :(
        </v-alert>
      </div>

    </section>

    <v-layout
      row
      justify-center>
      <v-dialog
        v-model="dialog"
        max-width="500px">
        <v-card>
          <v-card-title class="display-1">
            Thank you!
          </v-card-title>
          <v-card-text class="headline">
            <p class="checkout_total">Total: ${{ total }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              @click="checkout()">Solve</v-btn>
            <v-btn
              color="primary"
              @click.stop="dialog=false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      items: {},
      headers: [
        {
          text: 'Product',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Price', value: 'price' },
        { text: 'Quantity', value: 'qty' },
        { text: 'SubTotal', value: 'subtotal' },
        { text: 'Actions', value: 'actions' }
      ]
    }
  },
  computed: {
    cart () {
      return this.$store.getters.getCart
    },
    total () {
      let som = 0
      this.cart.map(item => {
        som += item.subtotal
      })
      return som
    }
  },
  methods: {
    checkout () {
      this.$router.push({ name: 'thankyou' })
      this.$store.commit('clearCart')
      localStorage.clear()
    },
    action (event, item) {
      switch (event) {
        case 'add':
          item.qty++
          item.subtotal = item.price * item.qty
          this.$store.commit('setQuantity', item)
          this.$store.commit('setPrice', item)
          localStorage.setItem('cart', JSON.stringify(this.cart))
          break
        case 'min':
          item.qty--
          item.subtotal = item.price * item.qty
          this.$store.commit('setQuantity', item)
          this.$store.commit('setPrice', item)
          localStorage.setItem('cart', JSON.stringify(this.cart))
          if (item.qty === 0) this.clearFromCart(item)
          break
        case 'clear':
          this.clearFromCart(item)
          break
        default:
          break
      }
    },
    clearFromCart (product) {
      const item = this.cart.find(item => {
        return item.id === product.id
      })
      const index = this.cart.indexOf(item)
      this.cart.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(this.cart))
    }
  }
}
</script>

<style lang="stylus" scoped>
  .table_header
    font-size 24px
    font-weight bold

  .table_item
    font-size 20px
    &__title
      font-weight bold
  .checkout
    margin-bottom 100px
  .checkout_total
    font-size 24px
    color #c00f1b
  .card_item-xs
    display flex
    flex-direction column
    padding 15px
    border 2px solid black
    margin-bottom 10px
    font-size 24px
    justify-content center
    align-items center
  .item-xs_title
    font-weight bold
  .btns
    font-size 3rem
</style>
