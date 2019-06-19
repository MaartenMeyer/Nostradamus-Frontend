import User from '@/models/User'
import * as MutationTypes from './mutation-types'
import VueCookie from 'vue-cookie';

const state = {
  user: User.from(VueCookie.get('access-token'))
}

const mutations = {
  [MutationTypes.LOGIN] (state) {
    state.user = User.from(VueCookie.get('access-token'))
  },
  [MutationTypes.LOGOUT] (state) {
    state.user = null
  }
}

const getters = {
  currentUser (state) {
    return state.user
  }
}

const actions = {
  login ({ commit }) {
    commit(MutationTypes.LOGIN)
  },

  logout ({ commit }) {
    commit(MutationTypes.LOGOUT)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}