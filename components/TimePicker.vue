<template>
  <b-timepicker
    v-if="!readonly"
    v-bind="$attrs"
    :value="value"
    :time-formatter="formatTime"
    :time-parser="parseTime"
    />
    <b-input v-else :value="formatTime(value)" readonly></b-input>
</template>

<script>
  import moment from 'moment';
  export default {
    name: "TimePicker",
    props: {
      readonly: Boolean,
      value: {
        type: String,
        default() {
          return ''
        }
      },
      format: {
        type: String,
        default: 'HH:mm'
      },
      parseFormat: {
        type: String,
        default: 'HH:mm'
      }
    },
    methods: {
      formatTime(date){
        const time = moment(date).format(this.format);
        this.$emit('input', time);
        return time;
      },
      parseTime(date){
        return moment(date, this.parseFormat).toDate()
      }
    }
  }
</script>

<style scoped>

</style>
