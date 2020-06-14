<template lang="pug">

  div.v-package-version-link
    div.v-package-version-link__input.pa-1
      v-text-field(
        readonly
        outlined
        :value="link"
      )
        template(#append-outer)
          slot

</template>

<script>

export default {
  name: "v-package-version-link",
  components: {
  },
  props: {
    packageName: String,
    packageVersion: String
  },
  data(){
    return {
      baseURL: "https://cdn.jsdelivr.net/npm/"
    }
  },
  computed: {
    link(){
      return this.baseURL + this.packageName + "@" + this.packageVersion;
    }
  },
  methods: {

  }
}
</script>

<style>

  .v-package-version-link{
    position: relative;
  }

</style>
