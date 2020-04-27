<template>
  <b-select
    :disabled="readonly"
    :loading="loading"
    :value="value"
    @input="emit"
    expanded
  >
    <template v-for="o in $attrs.props.options">
      <option :value="o.value" v-if="typeof(o) === 'object'">{{ o.label || o.text }}</option>
      <option :value="o" v-else>{{ o }}</option>
    </template>
  </b-select>
</template>
<script>
  import InputMixin from "./InputMixin";

  export default {
    name: 'InputFormSelect',
    mixins: [InputMixin],
    props: {
      options: Array,
    }
  }
</script>
