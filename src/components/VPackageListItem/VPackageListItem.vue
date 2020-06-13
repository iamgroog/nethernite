<template lang="pug">

  v-container.v-package-list-item.d-flex

    template(v-if="package")
      div.col-6 {{package.npm.package.name}}
      div.col-4 {{package.npm.package.author && package.npm.package.author.name}}
      div.col-2 v{{package.npm.package.version}}

    template(v-else)
      div.col-12 Обновить

</template>

<script>

// import { mapActions, mapGetters } from "vuex";

export default {
  name: "v-package-list-item",
  components: {},
  directives: {},
  filters: {},
  props: {
    package: Object
  },
  data() {
    return {

    }
  },
  computed: {
    // ...mapGetters("module", [
    //   "getter1",
    //   "getter2",
    // ])
  },
  watch: {},
  methods: {
    // ...mapActions("module", [
    //   "action1",
    //   "action2",
    // ])
  },
  beforeCreate(){},
  created(){},
  beforeMount(){},
  mounted(){},
  beforeUpdate(){},
  updated(){},
  activated(){},
  deactivated(){},
  beforeDestroy(){},
  destroyed(){},
  errorCaptured(){}
}

</script>

<style lang="scss">

.v-package-list-item{
  position: relative;
}

</style>
