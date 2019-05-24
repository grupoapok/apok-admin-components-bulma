<template>
  <aside class="menu">
    <template v-for="(child,i) in menu">
      <template v-if="!Array.isArray(child)">
        <p class="menu-label" v-if="child.title" :key="`title_${i}`">{{ child.title }}</p>
        <ul class="menu-list">
          <admin-menu-entry v-for="(entry,j) in child.children" v-bind="entry"
                            :key="`entry_${i}_${j}`"></admin-menu-entry>
        </ul>
      </template>
      <template v-else>
        <ul class="menu-list">
          <admin-menu-entry v-for="(entry,j) in child" v-bind="entry"
                            :key="`entry_${i}_${j}`"></admin-menu-entry>
        </ul>
      </template>
    </template>
    <!--
    <p class="menu-label">General</p>
    <ul class="menu-list">
      <li><a>Dashboard</a></li>
      <li><a>Customers</a></li>
    </ul>

    <p class="menu-label">Administration</p>
    <ul class="menu-list">
      <li><a><b-icon icon="account"/>Team Settings</a></li>
      <li>
        <a class="is-active">Manage Your Team</a>
        <ul>
          <li><a>Members</a></li>
          <li><a>Plugins</a></li>
          <li><a>Add a member</a></li>
        </ul>
      </li>
      <li><a>Invitations</a></li>
      <li><a>Cloud Storage Environment Settings</a></li>
      <li><a>Authentication</a></li>
    </ul>
    <p class="menu-label">
      Transactions
    </p>
    <ul class="menu-list">
      <li><a>Payments</a></li>
      <li><a>Transfers</a></li>
      <li><a>Balance</a></li>
    </ul>-->
  </aside>
</template>

<script>
  import menu from '@/config/menu';
  import AdminMenuEntry from "./AdminMenuEntry";

  export default {
    name: "AdminMenu",
    components: { AdminMenuEntry },
    data() {
      return {
        menu
      }
    }
  }
</script>

<style scoped>

</style>
