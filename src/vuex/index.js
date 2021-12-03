import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import moduleUser from './module/user.js'
import moduleApp from './module/app.js'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    user: moduleUser,
    app:  moduleApp
  }
})
