<template>
  <aside>
    <template v-for="(child,i) in items">
      <template v-if="!!child.children">
        <p :key="`title_${i}`" class="menu-label" v-if="expanded && !!child.title">{{ child.title }}</p>
        <ul class="menu-list">
          <menu-item-renderer :key="`entry_${i}_${j}`" :mini="!expanded"
                            v-bind="entry"
                            v-for="(entry,j) in child.children"/>
        </ul>
      </template>
      <ul class="menu-list" v-else>
        <menu-item-renderer :key="`entry_${i}`" :mini="!expanded"
                          v-bind="child"/>
      </ul>
    </template>
  </aside>
</template>

<script>
  export default {
    name: "LayoutMenu",
    props: {
      items: {
        type: Array,
        default() {
          return [];
        }
      },
      expanded: {
        type: Boolean,
        default: true,
      },
    }
  }
</script>

<style lang="scss">
  .menu-label {
    padding: .75em .75em 0;
  }

  .menu-list {
    a {
      border-radius: 0 !important;
    }
  }
</style>
