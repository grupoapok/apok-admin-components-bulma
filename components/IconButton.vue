<template>
  <b-button
    :class="['icon-button', realIcon.materialIcon && 'is-inline-flex align-items-center']"
    v-bind="$attrs"
    v-on="$listeners">
    <slot name="icon">
      <icon-renderer
        :class="['button-icon-left', realIcon.materialIcon && 'md-18']"
        v-bind="realIcon"
        v-if="icon && !right"
      />
    </slot>
    <slot/>
    <slot name="right-icon">
      <icon
        :class="['button-icon-right', realIcon.materialIcon && 'md-18']"
        :icon="icon"
        v-bind="realIcon"
        v-if="icon && right"
      />
    </slot>
  </b-button>
</template>

<script>
  import Icon from './Icon';

  export default {
    name: 'IconButton',
    inheritAttrs: false,
    components: { Icon },
    props: {
      iconOnly: {
        type: Boolean,
        default: false,
      },
      right: Boolean,
      icon: {
        type: [Object, String],
        default: null,
      },
    },
    computed: {
      realIcon() {
        if (this.icon === null) {
          return {};
        }
        if (typeof this.icon === 'string') {
          return { icon: this.icon }
        }
        return this.icon
      },
      hasContent() {
        if (this.$slots && this.$slots.default && this.$slots.default.length){
          return this.$slots.default.some(slot => {
            return !!slot.text || (slot.children && slot.children.length && slot.children.some(c => !!c.text))
          })
        }
        return false;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .button-icon-left {
    margin-right: $button-padding-horizontal;
  }

  .button-icon-right {
    margin-left: $button-padding-horizontal;
  }
</style>
