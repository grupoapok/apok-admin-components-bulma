<template>
  <b-select
    placeholder="No option selected..."
    :disabled="readonly"
    :loading="loading"
    :value="value"
    @input="emit"
    expanded
  >
    <option v-for="(option, i) in options" :key="i" :value="option.value">
      {{ option.text }}
    </option>
  </b-select>
</template>
<script>
  import InputMixin from "./InputMixin";

  export default {
    name: 'InputFormSelect',
    mixins: [InputMixin],
    props: {
      options: {
        type: Array,
        default() {
          return [{value: 'default value', text: 'Option 1'}]
        }
      },
    }
  }
</script>
