import Vue from "vue"
import Vuex from "vuex"

import contsructAxiosInstance from "./../script/contsructAxiosInstance";

Vue.use(Vuex)

const NPMApiRequest = contsructAxiosInstance({ baseURL: "https://api.npms.io/v2", url: "/saerch" });
const JsdelivrPackageApiRequest = contsructAxiosInstance({ baseURL: "https://data.jsdelivr.com/v1/package/npm/", url: "" });

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
    /**
     * Получить пакеты из кэша
     */
    getPackagesFromCache(state){
      /**
       * Получить данные пакетов из кэша
       * @param {String} query текст запроса
       * @param {Number} page номер страницы
       */
      return function(query, page = 1) {
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
    },
    /**
     * Получить количество страниц
     */
    getPagesAmout(state){
      return Math.ceil(state.totalFound / state.settings.pageSize);
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
          const newPackage = {
            timestamp: Date.now(),
            npm: false,
            jsdelivr: false
          };
          Vue.set(state.packagesСache, packageName, newPackage);
        }

        state.packagesСache[packageName].npm = item;
      })
    },
    UPDATE_PACKAGE_DATA_FROM_NPM(state, data){
      state.packagesСache[data.package.name].npm = data;
    },
    UPDATE_PACKAGE_DATA_FROM_JSDELIVR(state, { data, packageName }){
      state.packagesСache[packageName].jsdelivr = data;
    },
    SET_PAGE(state, page){
      state.page = page;
    }
  },

  actions: {
    /**
     * Подготоаить запрос для получения пакетов
     */
    async searchPackages({ state, commit, dispatch, getters }, { query, page = 1 }){
      const from = Math.max((page - 1) * state.settings.pageSize, 0);
      const size = state.settings.pageSize;
      const request = { query, from, size };

      if (!query){
        // TODO Показать популяные
        console.warn("Empty request");
        return false;
      }

      /* Если запрос уже был, взять из кэша */
      if (state.searchHistory[query]) {
        /* Проверить наличие записей в кэше */
        const packagesInHistory = state.searchHistory[query].slice(from, from + size);

        /* Если каких-то нет - получить */
        const notEmptyItems = packagesInHistory.reduce(total => ++total, 0);
        if (notEmptyItems < size) {
          await dispatch("searchPackagesInNPM", request)
        }
      } else {
      /* Если нет, получить из NPM */
        await dispatch("searchPackagesInNPM", request)
      }

      /* Сохранить запрос */
      commit("SET_QUERY", query);
      /* Расчитать результирую страницу */
      commit("SET_PAGE", page);
      /* Сформировать результат */
      commit("UPDATE_SEARCH_RESULT", getters.getPackagesFromCache(query, page));
    },
    /**
     * Найти пакеты в NPM
     * @param {Object} VuexInstance
     * @param {Object} Payload
     * @param {String} Payload.q Текст запроса
     * @param {Number} Payload.from Позиция, с которой будут возвращены релультаты
     * @param {Number} Payload.size Количество резльтатов, которое будет возвращено
     */
    async searchPackagesInNPM({ state, commit, dispatch }, { query, from = 0, size = 0 }){
      const request = {
        q: query, from, size: size || state.settings.pageSize
      }

      commit("SET_PENDING_RESPONSE", true);

      await NPMApiRequest.get("/search", { params: request })
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
              commit("ADD_SEARCH_HISTORY", { packages: response.data.results, query, offset: request.from });
            }
          }
        })
        /* Неудача */
        .catch(function (error) {
          console.error("Request failed", { request, error })
        })
        /* Устновить флаг об окончании ожидания ответа */
        .then(function() {
          commit("SET_PENDING_RESPONSE", false);
        })
    },
    /**
     * Найти пакеты в NPM
     * @param {Object} VuexInstance
     * @param {Object} Payload
     * @param {String} Payload.packageName Текст запроса
     */
    async searchPackagesInJsdelivr({ state, commit, dispatch, getters }, { packageName, version }){
      let request = packageName;
      if (version) request += "@" + version;

      await JsdelivrPackageApiRequest.get(request)
        /* Успех */
        .then(function(response) {
          if (response.status === 200) {
            commit("UPDATE_PACKAGE_DATA_FROM_JSDELIVR", { data: response.data, packageName })
          }
        })
        /* Неудача */
        .catch(function (error) {
          console.error("store:searchPackagesInJsdelivr:error", { request, error })
        })
    }
  }
})
