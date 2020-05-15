<template>
  <div @keyup.esc="showDialog = false" class="time-picker-container">
    <b-input
      :class="{'readonly': readonly}"
      :readonly="readonly"
      :value="time"
      @input="$emit('input',$event)"
      class="is-hidden-desktop"
      expanded
      type="time"
    />
    <b-input
      :class="{'readonly': readonly}"
      :value="time"
      @click.native="openDialog"
      class="is-hidden-touch"
      expanded
      readonly
      v-bind="$attrs"
    />
    <div class="time-picker-dialog" v-if="showDialog">
      <b-button @click="showDialog = false" class="close" type="is-text">&times;</b-button>
      <div class="columns is-vcentered is-multiline" v-if="showHours">
        <template v-if="showHours">
          <div class="column is-one-third">
            {{ hoursLabel | translate }}
          </div>
          <div class="column is-two-thirds">
            <b-numberinput :max="use24Hours ? 23 : 11" :min="0" :step="hoursInterval" v-model="model.hours"/>
          </div>
        </template>
        <template v-if="showMinutes">
          <div class="column is-one-third">
            {{ minutesLabel | translate }}
          </div>
          <div class="column is-two-thirds">
            <b-numberinput :max="59" :min="0" :step="minutesInterval" v-model="model.minutes"/>
          </div>
        </template>
        <template v-if="showSeconds">
          <div class="column is-one-third">
            {{ secondsLabel | translate }}
          </div>
          <div class="column is-two-thirds">
            <b-numberinput :max="59" :min="0" :step="secondsInterval" v-model="model.seconds"/>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: "InputFormTimePicker",
    inheritAttrs: false,
    data() {
      return {
        showDialog: false,
        model: {
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      }
    },
    props: {
      hoursLabel: {
        type: String,
        default: 'Hours'
      },
      minutesLabel: {
        type: String,
        default: 'Minutes'
      },
      secondsLabel: {
        type: String,
        default: 'Seconds'
      },
      readonly: {
        type: Boolean,
        default: false,
      },
      state: {
        type: String,
        default: null
      },
      buttonsVariant: {
        type: String,
        default: null
      },
      hoursInterval: {
        type: Number,
        default: 1,
      },
      minutesInterval: {
        type: Number,
        default: 1
      },
      secondsInterval: {
        type: Number,
        default: 1,
      },
      value: {
        type: String,
        default: null
      },
      format: {
        type: String,
        default: 'HH:mm'
      }
    },
    computed: {
      use24Hours() {
        return this.format.indexOf("H") !== -1 || this.format.indexOf("k") !== -1
      },
      showSeconds() {
        return this.format.indexOf("s") !== -1
      },
      showHours() {
        return this.format.indexOf("h") !== -1 || this.format.indexOf("H") !== -1
      },
      showMinutes() {
        return this.format.indexOf("m") !== -1
      },
      time() {
        const time = new moment();
        time.hours(this.model.hours);
        time.minutes(this.model.minutes);
        time.seconds(this.model.seconds);
        return time.format(this.format)
      }
    },
    watch: {
      value: {
        handler: 'updateModel',
        immediate: true
      },
      ['model.hours']() {
        this.$emit('input', this.time)
      },
      ['model.minutes']() {
        this.$emit('input', this.time)
      },
      ['model.seconds']() {
        this.$emit('input', this.time)
      },
    },
    methods: {
      openDialog() {
        console.log("ASDASD");
        if (!this.readonly) {
          this.showDialog = true
        }
      },
      updateModel(val) {
        if (val) {
          const time = new moment(val, this.format)
          this.model.hours = time.hours()
          this.model.minutes = time.minutes()
          this.model.seconds = time.seconds()
        }
      },
      increaseHours() {
        this.model.hours = (this.model.hours + this.hoursInterval) % (this.use24Hours ? 24 : 12)
      },
      increaseMinutes() {
        this.model.minutes = (this.model.minutes + this.minutesInterval) % 60
      },
      increaseSeconds() {
        this.model.seconds = (this.model.seconds + this.secondsInterval) % 60
      },
      decreaseHours() {
        this.model.hours = (this.model.hours - this.hoursInterval) % (this.use24Hours ? 24 : 12)
        if (this.model.hours < 0) {
          this.model.hours += (this.use24Hours ? 24 : 12)
        }
      },
      decreaseMinutes() {
        this.model.minutes = (this.model.minutes - this.minutesInterval) % 60
        if (this.model.minutes < 0) {
          this.model.minutes += 60
        }
      },
      decreaseSeconds() {
        this.model.seconds = (this.model.seconds - this.secondsInterval) % 60
        if (this.model.seconds < 0) {
          this.model.seconds += 60;
        }
      },
      emitFormattedTime() {
        this.$emit('input', this.time)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .time-picker-container {
    flex-grow: 1;
    position: relative;

    input[type="text"], input[type="time"] {
      background: $input-background-color !important;

      &.readonly {
        background: $input-disabled-background-color !important;
      }
    }

    .close {
      position: absolute;
      top: 0;
      right: 0;
      outline: none !important;
      text-decoration: none !important;
    }

    .time-picker-dialog {
      max-width: 250px;
      padding: 2.25rem .75rem .75rem .75rem;
      background: $white;
      border-radius: $input-radius;
      border: 1px solid $input-border-color;
      position: absolute;
      z-index: 9999;
      left: 0;
      top: 100%;
    }
  }
</style>
