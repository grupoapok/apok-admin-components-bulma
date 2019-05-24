<template>
  <b-datepicker
    v-if="!readonly"
    :value="value"
    v-bind="$attrs"
    :date-formatter="formatDate"
    :date-parser="parseDate"
    @input="$emit('input',$event)"
  ></b-datepicker>
  <b-input v-else :value="formatDate(value)" readonly></b-input>
</template>

<script>
  import moment from 'moment';
  export default {
    name: "Calendar",
    props: {
      readonly: Boolean,
      value: {
        type: Date,
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
    methods: {
      formatDate(date){
        return moment(date).format(this.format)
      },
      parseDate(date){
        return moment(date, this.parseFormat).toDate()
      }
    }
  }
</script>

<style scoped>

</style>
