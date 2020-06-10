<template>
  <li class="admin-menu-item">
    <router-link :title="$t(label)" :to="to" class="is-inline-flex" v-if="!hasChildren">
      <icon-renderer :class="{'mini': mini}" class="admin-menu-item-icon" v-bind="icon" v-if="icon"/>
      <span v-if="!mini">
                {{ label | translate }}
            </span>
    </router-link>
    <a :title="$t(label)" @click.prevent="toggleChildren" v-else>
      <icon-renderer :class="{'mini': mini}" :icon="icon" class="admin-menu-item-icon" v-if="icon"/>
      <span v-if="!mini">
                {{ label | translate }}
            </span>
    </a>
    <ul :class="[!expanded && 'is-hidden']" v-if="children.length">
      <admin-menu-entry :key="`child_${i}`" v-bind="child" v-for="(child, i) in children"/>
    </ul>
  </li>
</template>

<script>
  export default {
    name: "LayoutMenuItem",
    data() {
      return {
        expanded: false
      }
    },
    props: {
      label: String,
      to: Object || String,
      icon: Object || String,
      children: {
        type: Array,
        default() {
          return [];
        }
      },
      mini: Boolean
    },
    computed: {
      hasChildren() {
        return this.children.length > 0;
      },
      destination() {
        if (!this.children.length) {
          return this.to
        }
        return '';
      }
    },
    methods: {
      toggleChildren() {
        if (this.children.length) {
          this.expanded = !this.expanded;
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .admin-menu-item {
    a {
      align-items: center;
      width: 100%;

      .admin-menu-item-icon {
        margin-right: 1em;

        &.mdi {
          margin-right: 1.5em;
        }

        &.mini {
          margin-right: 0;
        }
      }
    }
  }
</style>
