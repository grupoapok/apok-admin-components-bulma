<template>
  <div>
  <b-checkbox
    :disabled="readonly"
    :value="value"
    @input="emit"
  >
    {{ label | translate }}
  </b-checkbox>
  </div>
</template>
<script>
  import InputMixin from "./InputMixin";

  export default {
    name: 'InputFormCheck',
    mixins: [InputMixin],
    props: {}
  }
</script>
