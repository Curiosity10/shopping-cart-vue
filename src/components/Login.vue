<template>
  <v-content>
    <v-container
      fluid
      fill-height>
      <v-layout
        align-center
        justify-center>
        <v-card
          v-if="selectedLogin === false"
          class="elevation-12 mt-5">
          <v-toolbar
            dark
            class="teal darken-3">
            <v-toolbar-title>Select the login method</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="justify-center align-content-center d-flex login">
            <v-btn
              :loading="loading"
              dark
              color="green"
              class="title login_btn"
              alt="Sign in with Google"
              @click="loginWithGoogle"
            >
              Sign in with Google
            </v-btn>
            <v-btn
              :loading="loading"
              dark
              color="light-blue darken-1"
              class="title login_btn"
              alt="Sign in with Twitter"
              @click="loginWithTwitter"
            >
              Sign in with Twitter
            </v-btn>
            <v-btn
              :loading="loading"
              dark
              color="grey darken-4"
              class="title login_btn"
              alt="Sign in with Github"
              @click="loginWithGithub"
            >
              Sign in with Github
            </v-btn>
            <v-btn
              :loading="loading"
              color="grey lighten-3"
              class="title login_btn"
              alt="Sign in with Email"
              @click="selectedLogin = true"
            >
              Sign in with Email
            </v-btn>
          </v-card-text>
        </v-card>
        <v-flex
          v-else
          xs12
          sm8
          md6>
          <v-card class="elevation-12 mt-5">
            <v-toolbar
              dark
              class="teal darken-3">
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form
                ref="form"
                v-model="valid"
                validation>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  class="title"
                  prepend-icon="person"
                  name="email"
                  label="Email"
                  type="email"
                />
                <v-text-field
                  id="password"
                  :counter="6"
                  v-model="password"
                  :rules="passwordRules"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                :disabled="!valid || loading"
                :loading="loading"
                outline
                color="teal darken-3"
                alt="Login"
                @click="onSubmit"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>

export default {
  data () {
    return {
      selectedLogin: false,
      email: '',
      password: '',
      valid: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters'
      ]
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  created () {
    if (this.$route.query['loginError']) {
      this.$store.dispatch('setError', 'Please log in to access this page.')
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('loginUser', user)
          .then(() => {
            this.$router.push('/')
          })
          .catch(() => {
          })
      }
    },
    loginWithGoogle () {
      this.$store.dispatch('loginUserWithGoogle')
        .then(() => {
          this.$router.push('/')
        })
        .catch(() => {
        })
    },
    loginWithGithub () {
      this.$store.dispatch('loginUserWithGithub')
        .then(() => {
          this.$router.push('/')
        })
        .catch(() => {
        })
    },
    loginWithTwitter () {
      this.$store.dispatch('loginUserWithTwitter')
        .then(() => {
          this.$router.push('/')
        })
        .catch(() => {
        })
    }
  }
}

</script>

<style lang="stylus" scoped>
  .login
    flex-wrap wrap
    &_btn
      min-width 300px
</style>

