<template>


    <!--<b-datepicker
      icon-pack="fal"
      icon-next="arrow-right"
      icon-prev="arrow-left"
      @input="$emit('input', $event)"
      :date-formatter="formatDate"
      :date-parser="parseDate"
      v-if="!readonly"
      :value="value"
      placeholder="Select a date...">
    </b-datepicker>-->

  <b-datepicker
          v-if="!readonly"
          :value="value"
          :date-formatter="formatDate"
          :date-parser="parseDate"
          @input="$emit('input',$event)"
  />
  <b-input v-else :value="formatDate(value)" readonly/>
</template>

<script>
  import { format, parse } from 'date-fns';
  import InputMixin from "./InputMixin";

  export default {
    name: "InputFormCalendar",
    mixins: [InputMixin],
    props: {
      readonly: Boolean,
      value: {
        type: [String, Date],
        default() {
          return new Date()
        }
      },
      format: {
        type: String,
        default: 'dd/MM/yyyy'
      },
      parseFormat: {
        type: String,
        default: 'yyyy-MM-dd'
      }
    },
    watch: {
      value: {
        handler: function (val) {
          if (typeof (val) === 'string') {
            this.value = this.parseDate(val)
          }
        },
        immediate: true
      }
    },
    methods: {
      formatDate(date) {
        return format(date, this.format)
      },
      parseDate(date) {
        return parse(date, this.parseFormat, new Date())
      },
    }
  }
</script>
