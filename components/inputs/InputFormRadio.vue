<template>
  <div>
    <div v-for="(o,i) in processedOptions" class="field" :key="i">
      <b-radio
        :disabled="readonly"
        :key="`radio_${i}`"
        :native-value="o.value"
        :value="value"
        @input="emit"
      >
        {{ o.label | translate }}
      </b-radio>
    </div>
  </div>
</template
>
<script>
  import InputMixin from "./InputMixin";

  export default {
    name: 'InputFormRadio',
    mixins: [InputMixin],
    props: {
      options: {
        type: Array,
        default() {
          return [
            {
              label: 'Default',
              value: false
            }
          ]
        }
      }
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
