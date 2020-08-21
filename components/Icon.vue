<template>
  <font-awesome-icon
    class="admin-icon"
    :icon="icon"
    :spin="spin"
    v-bind="$attrs"
    v-if="!material && !mdi"
  />
  <i :class="['admin-icon mdi', `mdi-${icon}`, `mdi-${$attrs.size || '24px'}`, spin && 'mdi-spin']" v-else-if="mdi"/>
  <i :class="`admin-icon material-icons${outlined ? '-outlined' : ''}`" v-else-if="material">{{ icon }}</i>
  <unicon :name="icon" :icon-style="iconStyle" v-bind="$attrs" v-else-if="unicons"/>

</template>

<script>
  export default {
    name: "Icon",
    inheritAttrs: false,
    props: {
      unicons: {
        type: Boolean,
        default: false,
      },
      iconStyle: {
        type: String,
        default: 'line',
      },
      material: {
        type: Boolean,
        default: false,
      },
      icon: {
        type: [String, Array],
        default: null
      },
      spin: {
        type: Boolean,
        default: false
      },
      outlined: {
        type: Boolean,
        default: false
      },
      mdi: {
        type: Boolean,
        default: false
      },
    }
  };
</script>

<style scoped>

</style>
