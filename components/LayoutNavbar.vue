<template>
  <b-navbar :is-active.sync="active" :class="['navbar', color && `is-${color}`]">
    <template v-slot:brand>
      <b-navbar-item @click.native="$emit('toggle-sidebar')"
                     class="is-hidden-mobile menu-toggle"
      >
        <icon-renderer icon="bars"/>
      </b-navbar-item>
      <b-navbar-item tag="div">
        {{ title }}
      </b-navbar-item>
    </template>

    <!--<template v-slot:start>
      <b-navbar-item
        class="is-hidden-desktop"
        :key="`navbar_menu_${i}`" :to="item.to"
        tag="router-link"
        v-for="(item,i) in menu"
      >
        <icon-renderer v-bind="item.icon" v-if="item.icon"/>
        {{ item.label | translate }}
      </b-navbar-item>
    </template>-->

    <template v-slot:end>
      <b-navbar-item tag="div">
        <b-navbar-dropdown :label="$i18n.locale() | uppercase"
                           v-if="locales.length > 1">
          <b-navbar-item :key="`locale_${i}`" @click="() => {$i18n.set(locale); showLocaleMenu = false}"
                         v-for="(locale, i) in locales">
            {{ locale | uppercase }}
          </b-navbar-item>
        </b-navbar-dropdown>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <b-navbar-dropdown :label="user.name" right>
          <b-navbar-item :to="{ name: 'Profile' }" tag="router-link">
            <icon-renderer icon="user"/>
            Profile
          </b-navbar-item>
          <b-navbar-item @click.prevent="$emit('logout')">
            <icon-renderer icon="sign-out-alt"/>
            Logout
          </b-navbar-item>
        </b-navbar-dropdown>
      </b-navbar-item>
    </template>

  </b-navbar>
</template>

<script>
  export default {
    name: "LayoutNavbar",
    data() {
      return {
        active: false,
      }
    },
    props: {
      user: {
        type: Object,
        default() {
          return {};
        },
      },
      expanded: Boolean,
      canToggleSidebar: {
        type: Boolean,
        default: true,
      },
      title: {
        type: String,
      },
      shortTitle: {
        type: String,
      },
      locales: {
        type: Array,
        default(){
          return [];
        }
      },
      color: {
        type: String,
        default: 'light'
      },
    },
  }
</script>

<style lang="scss" scoped>
  .navbar-start {
    .navbar-item {
      display: flex;
    }
  }
</style>
