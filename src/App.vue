<template lang="pug">

v-app(
  dark
)

  //- Header
  v-app-bar(
    app
    :height="102"
  )
    v-container.ma-auto.pa-2.pb-0(fluid)
      v-search-input

  //- Body
  v-main
    v-container(fluid)
      router-view

  //- Footer
  v-footer(app) footer

</template>

<script>

import VSearchInput from "./components/VSearchInput/VSearchInput"

export default {
  name: "App",
  components: {
    VSearchInput
  },
  data(){
    return {
    }
  }
}
</script>
