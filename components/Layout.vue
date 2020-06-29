<template>
  <div class="is-flex" id="admin-layout">
    <messages-renderer
      :messages="messages"
      @messageDismissed="(m) => $emit('messageDismissed', m)"
    />
    <layout-navbar-renderer
      v-bind="navbarProps"
      :user="user"
      @toggle-sidebar="$emit('toggle-sidebar')"
      @logout="$emit('logout')"
    />
    <main class="columns is-gapless">
      <menu-renderer :items="menu" :expanded="sidebarExpanded"/>
      <div class="column">
        <slot/>
      </div>
    </main>

    <layout-footer-renderer v-bind="footerProps" class="footer">
      <slot name="footer">This is the Footer</slot>
    </layout-footer-renderer>
  </div>
</template>

<script>
  export default {
    name: "Layout",
    props: {
      navbarProps: Object,
      footerProps: Object,
      menu: {
        type: Array,
        default() {
          return [];
        }
      },
      messages: {
        type: Array,
        default() {
          return [];
        }
      },
      user: Object,
      sidebarExpanded: Boolean,
      title: {
        type: String,
        default: 'Admin'
      },
      shortTitle: {
        type: String,
        default: 'A'
      }
    },
    methods: {
      confirmLogout() {
        this.$buefy.dialog.confirm({
          title: this.$t("dialogs.logout.title"),
          message: this.$t("dialogs.logout.text"),
          type: 'is-danger',
          confirmText: this.$t('actions.ok'),
          cancelText: this.$t('actions.cancel'),
          onConfirm: () => this.logout()
        });
      }
    },
  };
</script>

<style lang="scss" scoped>
  #admin-layout {
    min-height: 100vh;
    flex-direction: column;

    main {
      flex-grow: 1;

      .menu {
        padding: 0;
        border-right: 1px solid $grey-lighter;
      }
    }
  }
</style>
