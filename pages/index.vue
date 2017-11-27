<template>
  <main>
    <section class="container">
      <div>
        <a v-bind:href="'/dogs/' + dogBreed.breed" v-for="dogBreed in breeds" :key="dogBreed._id" class="breed">
          {{dogBreed.breed}}
          <span class="dev-info">{{dogBreed.v}}</span>
        </a>
      </div>
      <new-dog></new-dog>
    </section>
  </main>
</template>

<script>
import debug from "debug";
import gql from "graphql-tag";
// import client from "@/plugins/apollo";
import ALL_BREEDS_QUERY from "@/graphql/queries/breeds.gql";
import NewDog from "@/components/NewDog";

const logger = debug("dg:index");
logger("test logger output");


export default {
  components: {
    NewDog
  },

  // created() {
  // },

  apollo: {
    breeds: {
      query: ALL_BREEDS_QUERY,
      // We use a custom update callback because
      // the field names don't match.
      // By default, the 'breeds' attribute would be on the 'data' result object.
      // Here we know the result is in the 'Breeds' attribute.
      update(data) {
        return data.Breeds;
      }
    }
  },

  data() {
    return {
      breeds: []
    };
  },

  mounted() {
    logger("mounted index page");
  }
};
</script>

<style scoped>
.breed {
  border: solid 1px lightseagreen;
  color: blue;
  padding: 0.25em;
  margin: 0.25em;
  line-height: 2.5em;
}
.dev-info {
  display: none;
}
</style>
