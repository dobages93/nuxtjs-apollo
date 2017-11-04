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
import client from "../plugins/apollo";

const logger = debug("dg:new-dog");

export default {
  name: "new-dog",
  methods: {
    submit(event) {
      event.preventDefault();
      logger("submit form");
      const breed = document.querySelector("#breed").value;
      client.mutate({
        mutation: gql`
          mutation ($input: String!) {
            createBreed(input: $input)
          }
        `,
        variables: { input: breed }
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
