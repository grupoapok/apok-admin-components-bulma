<template>
  <div>
    <div class="field" v-for="(option, i) in options" :key="i">
      <b-checkbox
        :type="color"
        :name="option.label"
        :disabled="readonly"
        :value="option.value"
        @input="emit">
        {{ option.label | translate }}
      </b-checkbox>
    </div>
  </div>
</template>
<script>
  import InputMixin from "./InputMixin";

  export default {
    name: 'InputFormCheck',
    mixins: [InputMixin],
    props: {
      color: {
        type: String,
        default: 'is-info',
      },
      options: {
        type: [Array, String],
        default() {
          return [
            {
              label:'Default',
              value: false,
            }
          ]
        }
      }
    }
  }
</script>
