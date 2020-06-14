<template lang="pug">

    v-text-field.the-search-input(
      v-model.trim="searchQuery"
      :messages="inputHint"
      :loading="isPendingResponse"
      label="Поиск"
      outlined
      clearable
    )

</template>

<script>

// TODO Уменьшать поле ввода, если не в фокусе

import { mapState, mapActions } from "vuex"
import { debounce } from "lodash"
import filterSearchQuery from "@/script/filterSearchQuery"

export default {
  name: "the-search-input",
  components: {
  },
  data(){
    return {
    }
  },
  computed: {
    ...mapState([
      "query",
      "page",
      "totalFound",
      "isPendingResponse"
    ]),
    searchQuery: {
      get(){
        return this.query
      },

      set(query){
        /* Передача запроса и номера страницы в роутер, чтобы сохранять позицию в адресной строке, */
        /* что обеспечивает возможность передчи ссылки на результаты поиска */
        this.setQuery(query);
      }
    },
    inputHint(){
      if (!this.totalFound) {
        return "Ничего не найдено"
      }
      return `Найдено ${this.totalFound} разультатов`
    }
  },
  methods: {
    ...mapActions([
      "searchPackages"
    ]),
    setQuery: debounce(function(query) {
      this.$router.push({
        name: "TheSearchResults",
        params: {
          query: filterSearchQuery(query),
          page: 1
        }
      })

      this.searchPackages({ query });
    }, 500, { maxWait: 1000 })
  }
}

</script>

<style>

  .the-search-input{
    position: relative;

    height: 100%;
    width: 100%;
  }

</style>
