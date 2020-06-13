<template lang="pug">

  div.the-search-results Search Results for {{query}} in {{page}} page
    div.the-search-results__list
      template(v-for="item in searchResult")
        v-package-list-item(:package="item")

    div.the-search-results__pagination pagination

</template>

<script>
// TODO Запрос данных тут через геттер, проверить кэш и выдать результат
// TODO Список через транзиш-груп
import { mapState, mapActions } from "vuex"

import VPackageListItem from "@/components/VPackageListItem/VPackageListItem"

export default {
  name: "the-search-results",
  props: {
    query: String,
    page: [Number, String]
  },
  components: {
    VPackageListItem
  },
  computed: {
    ...mapState([
      "isPendingResponse",
      "searchResult"
    ])
  },
  methods: {
    ...mapActions([
      "requestPackges"
    ])
  },
  watch: {
    isPendingResponse(value){
      if (!value) {
        // eslint-disable-next-line no-unused-expressions
        console.log(this.searchResult);
      }
    }
  }
}
</script>

<style>

  .the-search-results{
    position: relative;

    height: 100%;
    width: 100%;
  }

</style>
