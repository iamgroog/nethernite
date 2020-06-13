import Vue from "vue"
import Vuex from "vuex"

import contsructAxiosInstance from "./../script/contsructAxiosInstance";
import getEmptySeries from "./../script/getEmptySeries";

Vue.use(Vuex)

// TODO Конструктор для пакета

const NPMApiRequest = contsructAxiosInstance({ baseURL: "https://api.npms.io/v2", url: "/saerch" });

export default new Vuex.Store({
  state: {
    settings: {
      pageSize: 10
    },

    packagesСache: {},
    searchHistory: {},

    query: "",
    page: 1,
    totalFound: null,
    searchResult: [],
    isPendingResponse: false
  },

  getters: {
    getPackagesFromCache(state){
      /**
       * Получить данные пакетов из кэша
       * @param {String} query текст запроса
       * @param {Number} page номер страницы
       */
      return function(query, page = 1) {
        // TODO если запрос пустой, то показать популярные пакеты и указывать это в подсказке

        if (!state.searchHistory[query]) {
          /* Если такого запроса не выполнялось */
          return false;
        }

        const firstItem = state.settings.pageSize * (page - 1);
        const lastItem = firstItem + state.settings.pageSize;

        const searchResponse = state.searchHistory[query].slice(firstItem, lastItem);

        if (searchResponse) {
          return searchResponse
        }

        return []
      }
    }
  },

  mutations: {
    SET_QUERY(state, query){
      state.query = query
    },
    SET_TOTAL_FOUND(state, total){
      state.totalFound = total
    },
    UPDATE_SEARCH_RESULT(state, result){
      state.searchResult = result;
    },
    SET_PENDING_RESPONSE(state, flag){
      state.isPendingResponse = flag
    },
    ADD_SEARCH_HISTORY(state, { query, packages, offset = 0 }){
      console.log("ADD_SEARCH_HISTORY", { state, query, packages });
      /* Если первый раз */
      if (!state.searchHistory[query]) {
        state.searchHistory[query] = []
      }
      /* Если первый раз */
      packages.forEach((item, index) => {
        /* Ссылка из кэша для того, чтобы в дельнейшем обновления свойств применялись автоматически */
        state.searchHistory[query][index + offset] = state.packagesСache[item.package.name];
      });
    },
    ADD_PACKAGES_TO_CACHE(state, packages){
      packages.forEach(function(item){
        const packageName = item.package.name;

        if (!state.packagesСache[packageName]) {
          state.packagesСache[packageName] = {
            timestamp: Date.now()
          }
        }

        state.packagesСache[packageName].npm = item;
      })
    },
    UPDATE_PACKAGE_DATA_FROM_NPM(state, data){
      state.packagesСache[data.package.name].npm = data;
    },
    UPDATE_PACKAGE_DATA_FROM_JSDELIVR(state, data){
      state.packagesСache[data.package.name].jsdelivr = data;
    }
  },

  actions: {
    /**
     * Подговорить запрос для получения пакетов
     */
    searchPackages({ state, commit, dispatch, getters }, { query, page = 1 }){
      const q = query;
      const from = Math.max((page - 1) * state.settings.pageSize, 0);
      const size = state.settings.pageSize;
      const request = { q, from, size };

      /* Если запрос уже был, взять из кэша */
      if (state.searchHistory[query]) {
        /* Проверить наличие записей в кэше */
        const packagesInHistory = state.searchHistory[query].slice(from, from + size);
        const emptySeries = getEmptySeries(packagesInHistory);

        /* Если каких-то нет - получить */
        if (emptySeries.length) {
          emptySeries.forEach(function(series) {
            dispatch("searchPackagesInNPM", { q, from: series.start, size: series.length })
          })
        }
      } else {
      /* Если нет, получить из NPM */
        dispatch("searchPackagesInNPM", request)
      }

      /* Сохранить запрос */
      commit("SET_QUERY", query);
      /* Сформировать результат */
      commit("UPDATE_SEARCH_RESULT", getters.getPackagesFromCache(request.q, state.page));
    },
    /**
     * Найти пакеты в NPM
     * @param {Object} VuexInstance
     * @param {Object} Payload
     * @param {Object} Payload.q Текст запроса
     * @param {Number} Payload.from Позиция, с которой будут возвращены релультаты
     * @param {Number} Payload.size Количество резльтатов, которое будет возвращено
     */
    searchPackagesInNPM({ state, commit, dispatch }, { q, from = 0, size = 0 }){
      const request = {
        q,
        from,
        size: size || state.settings.pageSize
      }

      commit("SET_PENDING_RESPONSE", true);

      NPMApiRequest.get("/search", { params: request })
        /* Успех */
        .then(function (response) {
          if (response.status === 200) {
            /* Разобрать ответ */
            if (response.data.results) {
              /* Установить количество найденых результатов */
              commit("SET_TOTAL_FOUND", response.data.total);
              /* Сохранить в кэш */
              commit("ADD_PACKAGES_TO_CACHE", response.data.results);
              /* Сохранить историю */
              commit("ADD_SEARCH_HISTORY", { packages: response.data.results, query: request.q, offset: request.from });
            }
          }
          console.log("Request success", { request, response });
        })
        /* Неудача */
        .catch(function (error) {
          console.error("Request failed", { request, error })
        })
        /* Устновить флаг об окончании ожидания ответа */
        .then(function() {
          commit("SET_PENDING_RESPONSE", false);
        })
    }
  }
})
