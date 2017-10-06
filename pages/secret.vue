<template>
  <h1>Secret Page</h1>
</template>

<script>
import axios from 'axios';

export default {
  // NOTE: This tells nuxt to use the auth middleware to look for the user token
  middleware: 'auth'
}
</script>

<style>

</style>
