<template>
  <v-container>
    <section class="checkout mt-3">

        <v-data-table
          :headers="headers"
          :items="cart"
          hide-actions
          class="elevation-1 hidden-sm-and-down"
          :loading="true"
        >
          <template slot="headerCell" slot-scope="props">
            <v-tooltip bottom>
                  <span class="table_header" slot="activator">
                    {{ props.header.text }}
                  </span>
              <span class="table_header">
                    {{ props.header.text }}
                  </span>
            </v-tooltip>
          </template>

          <v-progress-linear slot="progress" color="green" indeterminate></v-progress-linear>

          <template slot="items" slot-scope="props">
            <td class="table_item table_item__title">{{ props.item.name }}</td>
            <td class="table_item text-xs-left">${{ props.item.price }}</td>
            <td class="table_item text-xs-center">{{ props.item.qty }}</td>
            <td class="table_item text-xs-left">${{ props.item.subtotal }}</td>
            <td class="table_item table_cell table_btns">
              <v-btn small fab color="success" class="table_item btns_dec align-content-center" @click="action('min',props.item)">
                <v-icon medium>minimize</v-icon>
              </v-btn>
              <v-btn small color="error" class="table_item btns_clear" @click="action('clear',props.item)">
                <v-icon medium>delete</v-icon>
              </v-btn>
              <v-btn small fab color="success" class="table_item btns_inc" @click="action('add',props.item)">
                <v-icon medium>plus_one</v-icon>
              </v-btn>
            </td>
          </template>


          <template slot="footer">
            <td colspan="100%">
              <h4 class="checkout_total mt-3 mb-4">Total: ${{ total }}</h4>
              <v-btn :disabled="cart.length === 0" color="info" dark @click.stop="dialog = true">Checkout</v-btn>
            </td>
          </template>

          <template slot="no-data">
            <v-alert :value="true" color="error" icon="warning">
              Sorry, nothing to display here :(
            </v-alert>
          </template>

        </v-data-table>


        <div v-if="cart.length > 0" class="hidden-md-and-up">
          <div class="card_item-xs" v-for="item in cart">
            <p class="item-xs_title">{{item.name}}</p>
            <p>Subtotal: ${{item.subtotal}}</p>
            <p>Quantity: {{item.qty}}</p>
            <div>
              <v-btn small fab color="success" class="table_item btns_dec align-content-center" @click="action('min',item)">
                <v-icon medium>minimize</v-icon>
              </v-btn>
              <v-btn small color="error" class="table_item btns_clear" @click="action('clear',item)">
                <v-icon medium>delete</v-icon>
              </v-btn>
              <v-btn small fab color="success" class="table_item btns_inc" @click="action('add',item)">
                <v-icon medium>plus_one</v-icon>
              </v-btn>
            </div>
          </div>
          <h4 class="checkout_total mt-3 mb-4">Total: ${{ total }}</h4>
          <v-btn color="info" dark @click.stop="dialog = true">Checkout</v-btn>
        </div>

      <div class="hidden-md-and-up" v-else>
        <v-alert :value="true" color="error" icon="warning">
          Sorry, nothing to display here :(
        </v-alert>
      </div>

    </section>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="display-1">
            Thank you!
          </v-card-title>
          <v-card-text class="headline">
            <p>Total: ${{total}}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="checkout()">Solve</v-btn>
            <v-btn color="primary" @click.stop="dialog=false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
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
          {text: 'Price', value: 'price'},
          {text: 'Quantity', value: 'qty'},
          {text: 'SubTotal', value: 'subtotal'},
          {text: 'Actions', value: 'actions'}
        ]
      }
    },
    computed: {
      cart() {
        return this.$store.getters.getCart
      },
      total() {
        let som = 0;
        this.cart.map(item => {
          som += item.subtotal
        });
        return som;
      }
    },
    methods: {
      checkout() {
        this.$router.push({name: 'thankyou'});
        this.$store.commit('clearCart');
        localStorage.clear();
      },
      action(event, item) {
        switch (event) {
          case 'add':
            item.qty++;
            item.subtotal = item.price * item.qty;
            this.$store.commit('setQuantity', item);
            this.$store.commit('setPrice', item);
            localStorage.setItem('cart', JSON.stringify(this.cart));
            break;
          case 'min':
            item.qty--;
            item.subtotal = item.price * item.qty;
            this.$store.commit('setQuantity', item);
            this.$store.commit('setPrice', item);
            localStorage.setItem('cart', JSON.stringify(this.cart));
            if (item.qty === 0) this.clearFromCart(item);
            break;
          case 'clear':
            this.clearFromCart(item);
            break;
          default:
            break;
        }
      },
      clearFromCart(product) {
        let item = this.cart.find(item => {
          return item.id === product.id
        });
        let index = this.cart.indexOf(item);
        this.cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
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

  .checkout_total
    font-size 24px
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
  .btns_dec i
    padding-bottom 12px
</style>
