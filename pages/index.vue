<template>
  <main>
    <section class="container">
      <div>
        <a v-bind:href="'/dogs/' + dogBreed.breed" v-for="dogBreed in breeds" :key="dogBreed._id" class="breed">
          {{dogBreed.breed}}
        </a>
      </div>
      <new-dog></new-dog>
    </section>
  </main>
</template>

<script>
import debug from "debug";
// import breeds from '../graphql/queries/breeds.gql';
import gql from "graphql-tag";
import client from "../plugins/apollo";
import NewDog from "@/components/NewDog";

const logger = debug("dg:index");
logger("test logger output");

export default {
  components: {
    NewDog
  },
  async asyncData() {
    // console.log("-- asyncData called --");
    logger("-- asyncData called --");
    const result = await client.query({
      query: gql`
        query {
          Breeds {
            _id
            breed
          }
        }
      `
    });
    // console.log("-- Breeds:", JSON.stringify(result));
    logger("-- Breeds:", JSON.stringify(result));
    return {
      breeds: result.data.Breeds
    };
  },
  // data() {
  //   return {
  //     breeds: []
  //   };
  // },
  mounted() {
    // console.log("-- mounted called --");
    logger("mounted index page");
  }
};

// export default {
//   created() {
//     // Called synchronously after the instance is created.
//     // eslint-disable-next-line no-unused-vars
//     const int = setInterval(() => {
//       this.currentTime = `The time is ${(new Date()).toTimeString()}`;
//     }, 1000 * 1);
//     setTimeout(() => {
//       clearInterval(int);
//     }, 1000 * 30);
//   },
//   mounted() {
//     // Called after the instance has been mounted
//     // //  If you want to wait until the entire view has been rendered, you can use vm.$nextTick
//     // //  inside of mounted
//     // this.$nextTick(function() {
//     //   // Code that will run only after the
//     //   // entire view has been rendered
//     // });
//   },
//   updated() {
//     // Called after a data change causes the virtual DOM to be re-rendered and patched
//     // eslint-disable-next-line no-console
//     // console.log('data updated');
//   },
//   destroyed() {
//     // Called after a Vue instance has been destroyed
//   },
//   data() {
//     return {
//       currentDate: `The date is ${(new Date()).toDateString()}`,
//       currentTime: `The time is ${(new Date()).toTimeString()}`,
//     };
//   },
// };
</script>

<style scoped>
.breed {
  border: solid 1px lightseagreen;
  color: blue;
  padding: 0.25em;
  margin: 0.25em;
  line-height: 2.5em;
}
</style>
