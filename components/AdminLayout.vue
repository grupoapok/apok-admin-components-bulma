<template>
  <div id="admin-layout" class="is-flex">
    <admin-messages/>
    <admin-navbar @onLogout="confirmLogout"></admin-navbar>
    <main class="columns is-marginless">
      <div class="column is-narrow is-hidden-touch">
        <admin-menu></admin-menu>
      </div>
      <div class="column">
        <router-view/>
      </div>
    </main>
    <footer class="footer">
      <slot name="footer">Footer</slot>
    </footer>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import AdminMenu from "./AdminMenu";
import AdminNavbar from "./AdminNavbar";

export default {
  name: "AdminLayout",
  components: { AdminMenu, AdminNavbar },
  computed: {
    ...mapState("auth", ["user", "loggedIn"]),
    ...mapState("ui", ["sidebarExpanded"])
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    ...mapActions("ui", ["toggleSidebar"]),
    confirmLogout() {
      this.$dialog.confirm({
        title: this.$t("dialogs.logout.title"),
        message: this.$t("dialogs.logout.text"),
        onConfirm: () => this.logout()
      });
    }
  }
};
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
