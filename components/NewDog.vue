<template>
  <div>
    <form>
      <div>
        <label for="breed">Add New Dog Breed</label>
        <input type="text" name="breed" id="breed" placeholder="Dog Breed">
      </div>
      <button type="submit" @click="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import debug from "debug";
import gql from "graphql-tag";
import ALL_BREEDS_QUERY from "@/graphql/queries/breeds.gql";
const logger = debug("dg:new-dog");

export default {
  name: "new-dog",
  methods: {
    submit(event) {
      event.preventDefault();
      logger("submit form");
      const target = document.querySelector("#breed");
      const breed = target.value;
      this.$apollo.mutate({
        mutation: gql`
           mutation createBreed($input: String!) {
             createBreed(input: $input) {
               _id
               breed
               v
               created
               updated
             }
           }
        `,
        variables: {
          input: breed
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createBreed: {
            __typename: 'Dog',
            _id: -1,
            breed: breed,
            v: 0,
            created: (new Date()).toISOString(),
            updated: null
          }
        },
        update: (proxy, { data: { createBreed } }) => {
          try {
            logger(`createBreed: ${JSON.stringify(createBreed)}`);
            // Read the data from our cache for this query
            const data = proxy.readQuery({ query: ALL_BREEDS_QUERY });

            // Add our dog from the mutation to the end
            data.Breeds.push(createBreed);

            // Write our data back to the cache
            proxy.writeQuery({ query: ALL_BREEDS_QUERY, data });
            return proxy.readQuery({ query: ALL_BREEDS_QUERY });
          } catch (error) {
            logger(`error: ${error}`);
          }
        }
      }).then((data) => {
        // Result
        logger("new dog mutation result: %j", data);
        target.value = null;
      }).catch((error) => {
        // Error
        console.error(error)
        // We restore the initial user input
        target.value = breed
      });
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  margin: 1em;
}
label {
  margin-right: 0.5em;
}
</style>
