<template>
  <font-awesome-icon class="admin-icon" :icon="icon" :spin="spin" v-bind="$attrs"
                     v-if="!materialIcon && !mdi"/>
  <i :class="['admin-icon mdi', `mdi-${icon}`, `mdi-${$attrs.size || '24px'}`, spin && 'mdi-spin']" v-else-if="mdi"/>
  <i :class="`admin-icon material-icons${outlined ? '-outlined' : ''}`" v-else>{{ icon }}</i>
</template>

<script>
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

  export default {
    name: "Icon",
    inheritAttrs: false,
    components: { FontAwesomeIcon },
    props: {
      icon: {
        type: [String, Array],
        default: null
      },
      spin: {
        type: Boolean,
        default: false
      },
      materialIcon: {
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
