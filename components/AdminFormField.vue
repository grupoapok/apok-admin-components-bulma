<template>
  <b-field :addons="false"
           :label="type !== 'checkbox' ? $t(label) : ''"
           :message="error"
           :type="!!error ? 'is-danger' : ''">
    <b-field :type="!!error ? 'is-danger' : ''">

      <p class="control" v-for="addon in prepend">
        <span class="button is-static">
          <icon-renderer v-bind="addon" v-if="addon.icon"/>
          <template v-else>{{ addon }}</template>
        </span>
      </p>

      <component
        :is="`form-input-${type}-renderer`"
        v-bind="[$attrs.props, $attrs, $props]"
        :value="value"
        @input="emit"
      />

      <!--

      <template v-if="type === 'file'">

      </template>-->

      <p class="control" v-for="addon in append">
        <span class="button is-static">
          <icon-renderer v-bind="addon" v-if="addon.icon"/>
          <template v-else>{{ addon }}</template>
        </span>
      </p>

    </b-field>
    <p class="help" v-html="help" v-if="!!help"/>
  </b-field>
</template>

<script>

  import InputMixin from "./inputs/InputMixin";

  export default {
    name: "AdminFormField",
    inheritAttrs: false,
    mixins: [InputMixin],
    props: {
      append: Array,
      prepend: Array,
      help: String,
    },
  }
</script>

<style lang="scss" scoped>
  .file {
    width: 100%;

    .file-label {
      width: 100%;

      .file-name {
        max-width: 100% !important;
        flex-grow: 1;
      }
    }
  }
  .file-image {
    border: 1px solid $input-border-color;
    border-radius: $input-radius;

    img {
      border-radius: $input-radius;
    }
  }
</style>
