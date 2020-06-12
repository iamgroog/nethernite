<template lang="pug">

v-app(
  dark
)
  v-app-bar(
    app
    :height="102"
  )
    v-container.ma-auto.pa-2.pb-0(fluid)
      v-text-field(
        v-model="search"
        messages="Найдено n разультатов за m миллисекунд"
        label="Поиск"
        outlined
        clearable
      )

  v-main
    v-container(fluid)
      router-view

  v-footer(app) footer

</template>

<script>

export default {
  name: 'App',

  components: {
  },
  data(){
    return {
      search: ''
    }
  },
  created () {
    // this.$vuetify.theme.dark = true
  }
}
</script>
