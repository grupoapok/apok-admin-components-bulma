<template>
  <nav :class="['navbar', color && `is-${color}`]" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        {{ $constants.APP_NAME }}
      </a>

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" @click="active = !active"
         data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" :class="['navbar-menu', active && 'is-active']">
      <div class="navbar-start is-hidden-desktop">

      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-white">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "AdminNavbar",
    data() {
      return {
        active: false
      }
    },
    props: {
      color: {
        type: String,
        default: 'light'
      },
      spaced: Boolean,
    }
  }
</script>

<style scoped>

</style>
