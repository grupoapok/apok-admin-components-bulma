<template>
  <div>
    <b-radio
      :disabled="readonly"
      :key="`radio_${i}`"
      :native-value="o.value"
      :value="value"
      @input="emit"
      v-for="(o,i) in processedOptions"
    >
      {{ o.label | translate }}
    </b-radio>
  </div>
</template>
<script>
  import InputMixin from "./InputMixin";

  export default {
    name: 'InputFormRadio',
    mixins: [InputMixin],
    props: {
      options: Array
    },
    computed: {
      processedOptions() {
        return this.options.map(o => {
          if (typeof (o) === 'object' && o.hasOwnProperty('value') && o.hasOwnProperty('label')) {
            return o
          }
          return { label: `${o}`, value: `${o}` }
        })
      }
    },
  }
</script>
