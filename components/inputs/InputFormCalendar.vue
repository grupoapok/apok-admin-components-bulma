<template>
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
  import moment from 'moment';

  export default {
    name: "InputFormCalendar",
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
        default: 'DD/MM/YYYY'
      },
      parseFormat: {
        type: String,
        default: 'YYYY-MM-DD'
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
        return moment(date).format(this.format)
      },
      parseDate(date) {
        return moment(date, this.parseFormat).toDate()
      }
    }
  }
</script>
