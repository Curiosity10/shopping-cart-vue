<template>
  <v-content>
    <v-container
      fluid
      fill-height>
      <v-layout
        align-center
        justify-center>
        <v-flex
          xs12
          sm8
          md6>
          <v-card class="elevation-12 mt-5">
            <v-toolbar
              dark
              class="blue darken-2">
              <v-toolbar-title>Registration form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  prepend-icon="person"
                  name="email"
                  label="Email"
                  type="email"
                />
                <v-text-field
                  :counter="6"
                  v-model="password"
                  :rules="passwordRules"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                />
                <v-text-field
                  :counter="6"
                  v-model="confirmPassword"
                  :rules="confirmPasswordRules"
                  prepend-icon="repeat"
                  name="confirm-password"
                  label="Confirm Password"
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
                color="blue darken-2"
                alt="Create account"
                @click="onSubmit"
              >
                Create account
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
      email: '',
      password: '',
      confirmPassword: '',
      valid: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters'
      ],
      confirmPasswordRules: [
        v => !!v || 'Password is required',
        v => v === this.password || 'Password should match'
      ]
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmit: function () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('registerUser', user)
          .then(() => {
            this.$router.push('/')
          })
          .catch(() => {})
      }
    }
  }
}

</script>

<style lang="stylus" scoped>
</style>

