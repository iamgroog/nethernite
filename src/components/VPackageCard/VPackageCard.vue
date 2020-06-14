<template lang="pug">

  div.v-package-card
    v-container
      div.col-12
        v-card.pa-3
          div.v-package-card__header.pa-1
            h3.pa-1 {{package.npm.package.name}}

            div.subtitle-2
              template(v-if="package.npm.package.author")
                span.v-package-card__author.font-weight-thin.font-italic.ml-1 by {{package.npm.package.author.name}}
              template(v-if="package.npm.package.publisher.email")
                span.v-package-card__email.font-weight-light.font-italic.ml-1
                  | (
                  a(
                    :href="'mailto:' + package.npm.package.publisher.email"
                  ) {{package.npm.package.publisher.email}}
                  | )

            h4.pa-1 {{package.npm.package.description}}

            div.caption.pa-1 Updated: {{updatedDateFormated}}

            div.v-package-card__links.d-flex
              template(v-for="(link, name) in package.npm.package.links")
                div.pa-1
                  a(:href="link") [ {{name}} ]

          div.v-package-card__body.pa-2

            v-fade-transition

              template(v-if="package.jsdelivr")

                div.v-package-card__versions
                  div.v-package-card__latest-version Latest Version:
                    span.ml-1 {{package.jsdelivr.tags.latest}}
                  div.v-package-card__version-link.pa-1
                    v-package-version-link(
                      :package-name="packageName"
                      :package-version="package.jsdelivr.tags.latest"
                    )

                  div.v-package-card__latest-version Other Versions:

                  div.v-package-card__version-link.pa-1
                    v-package-version-link(
                      :package-name="packageName"
                      :package-version="selectedVersion"
                    )
                      v-select(
                        dense
                        :items="package.jsdelivr.versions"
                        v-model="selectedVersion"
                      )

              template(v-else)
                div.v-package-card__loading.d-flex.flex-column.align-center.justify-center
                  v-progress-circular(indeterminate)
                  div.font-weight-light.font-italic.text--primary connecting to jsdelivr...

          div.v-package-card__footer.d-flex.justify-end.pa-1
            v-btn( @click="hideModal" ) Закрыть

</template>

<script>

import { mapActions } from "vuex";
import VPackageVersionLink from "@/components/VPackageVersionLink/VPackageVersionLink";

export default {
  name: "v-package-card",
  components: {
    VPackageVersionLink
  },
  directives: {},
  filters: {},
  props: {
    package: Object
  },
  data() {
    return {
      selectedVersion: false
    }
  },
  computed: {
    updatedDateFormated(){
      const updated = new Date(this.package.npm.package.date);
      const date = updated.toLocaleDateString();
      const time = updated.toLocaleTimeString();
      return `${date} ${time}`
    },
    packageName(){
      return this.package.npm.package.name;
    }
  },
  watch: {
    "package.jsdelivr"(newValue){
      if (newValue) {
        this.selectedVersion = this.package.jsdelivr.tags.latest;
      }
    }
  },
  methods: {
    ...mapActions([
      "searchPackagesInJsdelivr"
    ]),
    hideModal(){
      this.$emit("hide-modal")
    },
    requestJsdelivrData(){
      if (!this.package.jsdelivr){
        this.searchPackagesInJsdelivr({ packageName: this.package.npm.package.name })
      }
    }
  },
  beforeCreate(){},
  created(){},
  beforeMount(){},
  mounted(){
    this.requestJsdelivrData();
  },
  beforeUpdate(){},
  updated(){
    this.requestJsdelivrData();
  },
  activated(){},
  deactivated(){},
  beforeDestroy(){},
  destroyed(){},
  errorCaptured(){}
}

</script>

<style lang="scss">

.v-package-card{
  position: relative;

  // &__author,
  // &__email{
  //   font-size: 75%;
  // }
}

</style>
