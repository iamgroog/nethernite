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
    v-container(fluid).app__body-contaier
      router-view

  //- Footer
  v-footer(app) footer

</template>

<script>
// TODO Карточки пакетов
// TODO Пагинация
// TODO Отправлять запрос данных из компонента

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
