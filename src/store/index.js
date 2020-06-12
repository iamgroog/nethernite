import Vue from "vue"
import Vuex from "vuex"
import constructSearchRequestToNPM from "./../script/constructSearchRequestToNPM";
import sendRequest from "./../script/sendRequest";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    packages: {},
    query: "",
    totalPackagesFound: null
  },
  getters: {
  },
  mutations: {
    SET_QUERY(state, query){
      state.query = query
    }
  },
  actions: {
    searchPackagesInNPM({ commit }, query){
      commit("SET_QUERY", query);
    },
    searchPackages({ commit }, query){
      commit("SET_QUERY", query);
      const request = constructSearchRequestToNPM(query);
      sendRequest(request);
    }
  }
})
