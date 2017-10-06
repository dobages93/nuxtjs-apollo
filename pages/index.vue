<template>
  <main>
    <section class="container">
      <div>
        <a v-bind:href="'/dogs/' + breed" v-for="breed in breeds" :key="breed" class="breed">
          {{breed}}
        </a>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import debug from 'debug';

const logger = debug('index');

export default {
  async asyncData() {
    const { data } = await axios.get('https://dog.ceo/api/breeds/list');
    return {
      breeds: data.message,
    };
  },
  mounted() {
    logger('mounted index');
  },
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
