<template>
  <b-input
    :loading="loading"
    :readonly="readonly"
    :type="type"
    :value="value"
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
