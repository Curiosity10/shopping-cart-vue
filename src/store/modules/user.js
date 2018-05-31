import * as fb from 'firebase/app'
require('firebase/auth')

class User {
  constructor(id) {
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser({commit}, {email, password}) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const user = await  fb.auth().createUserWithEmailAndPassword(email, password);
        commit('setUser', new User(user.uid));
        commit('setLoading', false);
      }
      catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error
      }
    },
    async loginUser({commit}, {email,password}) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const user = await  fb.auth().signInWithEmailAndPassword(email, password);
        commit('setUser', new User(user.uid));
        commit('setLoading', false);
      }
      catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error
      }
    },
    loginUserWithGoogle ({commit}) {
      commit('clearError');
      commit('setLoading', true);
      const provider = new fb.auth.GoogleAuthProvider();
      const user = fb.auth().signInWithRedirect(provider)
        .then(() => {
          commit('setUser', new User(user.uid));
          commit('setLoading', false);
        })
        .catch ((error) => {
        commit('setLoading', false);
        commit('setError', error.message);
      })
    },
    loginUserWithGithub ({commit}) {
      commit('clearError');
      commit('setLoading', true);
      const provider = new fb.auth.GithubAuthProvider();
      const user = fb.auth().signInWithRedirect(provider)
        .then(() => {
          commit('setUser', new User(user.uid));
          commit('setLoading', false);
        })
        .catch ((error) => {
          commit('setLoading', false);
          commit('setError', error.message);
        })
    },
    loginUserWithTwitter ({commit}) {
      commit('clearError');
      commit('setLoading', true);
      const provider = new fb.auth.TwitterAuthProvider();
      const user = fb.auth().signInWithRedirect(provider)
        .then(() => {
          commit('setUser', new User(user.uid));
          commit('setLoading', false);
        })
        .catch ((error) => {
          commit('setLoading', false);
          commit('setError', error.message);
        })
    },

    autoLoginUser ({commit}, payload) {
      commit('setUser', new User(payload.uid));
    },
    logoutUser ({commit}) {
      fb.auth().signOut();
      commit('setUser', null);
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    isUserLoggedIn (state){
      return state.user !==null
    }
  }
}

