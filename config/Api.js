import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://shopping-cart-vue.herokuapp.com/'
  })
}
