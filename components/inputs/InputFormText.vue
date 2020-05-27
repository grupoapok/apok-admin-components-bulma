<template>
  <b-input
    :readonly="readonly"
    :disabled="loading"
    :type="type"
    :value="value"
    v-bind="[$attrs.props, $attrs]"
    @input="emit"
    expanded
  />
</template>

<script>
  import InputMixin from "./InputMixin";

  export default {
    name: "InputFormText",
    mixins: [InputMixin]
  }
</script>
