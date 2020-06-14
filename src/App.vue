<template lang="pug">

v-app(
  dark
)

  //- Header
  v-app-bar(
    app
    :height="appBarHeight"
    ref="main-app-bar"
  )
    v-container.ma-auto.pa-2.pb-0(fluid)
      v-search-input

  //- Body
  v-main.app__body
    v-container(fluid).app__body-contaier.pa-0
      router-view

  //- Footer
  v-footer
    p 2 особенности, на которые я хочу обратить внимание:
      br
      | 1. В данном тестовом заднии реализованно примитивное кэширование запросов;
      br
      | 2. Также реализованно сохранение состояния в роутере. Мне кажется, это удобная возможность того, чтобы поделиться результатами поиска обычной ссылкой
    p Я просто не смог пройти мимо вашей вакансии!
    p Немного о себе: меня зовут Даниил и я разработчик с более чем трехлетним стажем. Я свитчер и мой вход во фронтенд был через игры. Сначала я писал гайды по прокачке, но понял, что этого мало и я хочу интерактивности для читателя. Я смотрел на большую таблицу скиллов и понимал, что это не то, что мне самому, как игроку, хочется видеть. Я хотел строить билды, а не выписывать статы на бумажку из вики и сравнивать в экселе параметры. Во мне поселилось чувство необходимости облегчить эту задачу, предоставить себе и сообществу удобный инструмент, адекватный текущему техническому прогрессу, универсальный и не завязанный на определенную платформу. С этого началось моё знакомство с JS... потом всё завертелось.
    p Сейчас я ведущий vue.js разработчик в игровом проекте на базе GTA V с уверенными знаниями экосистемы. Роутер, стор, cli - это всё инструменты повседневного использования. С огромным удовольствием пообщаюсь с единомышленниками, мне кажется, нам есть что обсудить.
    p Контакты:
      a.pl-1(href="mailto:groog@groog.ru") groog@groog.ru
      |,
      a.pl-1(href="https://t.me/iamgroog") https://t.me/iamgroog
      |,
      a.pl-1(href="https://career.habr.com/groog") Хабр Карьера
</template>

<script>

import { mapActions } from "vuex"

import VSearchInput from "./components/VSearchInput/VSearchInput"

export default {
  name: "App",
  components: {
    VSearchInput
  },
  data(){
    return {
      appBarHeight: 102
    }
  },
  methods: {
    ...mapActions([
      "searchPackages"
    ])
  },
  created(){
    const query = this.$router.history.current.params.query;
    const page = Number(this.$router.history.current.params.page);
    this.searchPackages({ query, page });
  },
  mounted(){
    this.appBarHeight = Math.ceil(this.$refs["main-app-bar"].$el.scrollHeight);
  }
}
</script>

<style lang="scss">

  .app{
    &__body-contaier{
      min-height: 100%;
    }
  }

</style>
