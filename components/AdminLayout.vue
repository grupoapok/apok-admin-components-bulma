<template>
  <div id="admin-layout" class="is-flex">
    <admin-navbar></admin-navbar>
    <main class="columns is-marginless">
      <div class="column is-narrow is-hidden-touch">
        <admin-menu></admin-menu>
      </div>
      <div class="column">
        <router-view/>
      </div>
    </main>
    <footer class="footer">
      Footer
    </footer>
  </div>
</template>

<script>
  import AdminMenu from "./AdminMenu";
  import AdminNavbar from "./AdminNavbar";

  export default {
    name: "AdminLayout",
    components: { AdminMenu, AdminNavbar },
  }
</script>

<style lang="scss" scoped>
  #admin-layout {
    min-height: 100vh;
    flex-direction: column;
    main {
      flex-grow: 1;
    }
  }
</style>
