<template lang="pug">

  v-vontainer.the-package-list(
    fluide
  )
    div.col-12
      template(v-for="package in packages")
        v-package-list-item(:package="package")

</template>

<script>

import VPackageListItem from "@/components/VPackageListItem/VPackageListItem";

export default {
  name: "the-package-list",
  components: {
    VPackageListItem
  },
  props: {
    packages: Array
  }
}
</script>

<style>

  .the-package-list{
    position: relative;

    height: 100%;
    width: 100%;
  }

</style>
