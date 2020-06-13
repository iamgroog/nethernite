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
// TODO Валидация (только текст)
// TODO Экранирование
// TODO Не отправлять пустые значения
// TODO Показывать кнопку повоторить в подсказке при неудаче
// TODO Логика через геттер
// TODO Уменьшать поле ввода, если не в фокусе
import { mapState, mapActions } from "vuex"
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
        this.$router.push({
          name: "TheSearchResults",
          params: {
            query: filterSearchQuery(query),
            page: 1
          }
        });

        this.searchPackages({ query });
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
    ])
  },
  created(){
    const query = this.$router.history.current.params.query;
    this.searchPackages({ q: query });
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
