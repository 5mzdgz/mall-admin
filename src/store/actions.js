import {  } from './mutations-types.js'

export default {
    token({commit}, token) {
        commit('TOKEN', token)
    },
    userData({commit}, userData) {
        commit('USER_DATA', userData)
    }
}