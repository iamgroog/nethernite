<template lang="pug">

  div.the-search-results
    div.the-search-results__list

      template(v-for="item in searchResult")
        div.the-search-results__list-item(
          v-ripple
          @click="showModal(item)"
        )
          v-package-list-item(:package="item")

    v-dialog(v-model="modal")
      //- Карточка (модалка)
      v-package-card(
        :package="packageToShow"
        @hide-modal="hideModal"
      )

    div.the-search-results__pagination(
      v-if="query && query.length"
    )
      v-container.pa-0
        v-pagination(
          :length="getPagesAmout"
          :value="page"
          :total-visible="7"
          @input="changePage"
        )

</template>

<script>
// TODO Список через транзиш-груп
import { mapState, mapGetters, mapActions } from "vuex"

import VPackageListItem from "@/components/VPackageListItem/VPackageListItem"
import VPackageCard from "@/components/VPackageCard/VPackageCard"

export default {
  name: "the-search-results",
  props: {
    query: String
  },
  data(){
    return {
      modal: false,
      packageToShow: undefined
    }
  },
  components: {
    VPackageListItem,
    VPackageCard
  },
  computed: {
    ...mapState([
      "isPendingResponse",
      "searchResult",
      "totalFound",
      "page"
    ]),
    ...mapGetters([
      "getPagesAmout"
    ])
  },
  methods: {
    ...mapActions([
      "searchPackages"
    ]),
    async changePage(page){
      const query = this.$router.history.current.params.query;
      await this.searchPackages({ query, page });

      this.$router.push({
        name: "TheSearchResults",
        params: {
          query: this.$router.history.current.params.query,
          page
        }
      });
    },
    showModal(item){
      this.modal = true;
      this.packageToShow = item;
    },
    hideModal(){
      this.modal = false;
    }
  }
}
</script>

<style lang="scss">

  .the-search-results{
    position: relative;

    height: 100%;
    width: 100%;

    &__list-item{
      width: 100%;
      border: {
        bottom: 1px solid rgba(255, 255, 255, 0.25);
      }

      cursor: pointer;
      transition: 0.25s;

      &:last-child{
        border: {
          bottom: none;
        }
      }

      &:hover{
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }

</style>
