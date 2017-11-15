<template>
  <div>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">Nuxt Bootstrap Demo Project</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">Home
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/about">About</a>
            </li>
            <!-- <li class="nav-item">
                    <a class="nav-link" href="#">Services</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Contact</a>
                  </li> -->
          </ul>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <!-- <h1 class="mt-5">A Bootstrap 4 Starter Template</h1>
                <p class="lead">Complete with pre-defined file paths and responsive navigation!</p>
                <ul class="list-unstyled">
                  <li>Bootstrap 4.0.0-beta</li>
                  <li>jQuery 3.2.1</li>
                </ul> -->
          <h1>Know Your Dog!</h1>

          <nuxt/>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import client from "../plugins/apollo";

export default {
  head() {
    // console.log("layout head generation");
    // console.log(JSON.stringify(client.cache.extract()));
    return {
      script: [
        {
          hid: "apolloState",
          innerHTML: `window.__APOLLO_STATE__=${JSON.stringify(client.cache.extract())}`,
          type: "text/javascript"
        }
      ],
      __dangerouslyDisableSanitizers: ['script']
    };
  }
};
</script>


<style>
body {
  padding-top: 54px;
}

@media (min-width: 992px) {
  body {
    padding-top: 56px;
  }
}
</style>
