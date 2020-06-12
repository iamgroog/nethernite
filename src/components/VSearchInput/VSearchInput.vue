<template lang="pug">

    v-text-field.the-search-input(
      v-model.trim="searchQuery"
      :messages="inputHint"
      label="Поиск"
      outlined
      clearable
    )

</template>

<script>
// TODO Валидация (только текст)
// TODO Экранирование
// TODO Не отправлять пустые значения
import { mapState, mapActions } from "vuex"

export default {
  name: "the-search-input",
  components: {
  },
  computed: {
    ...mapState([
      "query",
      "totalPackagesFound"
    ]),
    searchQuery: {
      get(){
        return this.query
      },
      set(query){
        this.searchPackages(query)
      }
    },
    inputHint(){
      if (!this.totalPackagesFound) {
        return "Ничего не найдено"
      }
      return `Найдено ${this.totalPackagesFound} разультатов`
    }
  },
  methods: {
    ...mapActions([
      "searchPackages"
    ])
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
