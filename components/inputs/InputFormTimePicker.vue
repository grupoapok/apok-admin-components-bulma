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
      <b-button @click="showDialog = false" class="close" size="is-small" type="is-text">
        <icon-renderer icon="times"/>
      </b-button>

      <!-- Hours input-->
      <div class="control columns is-vcentered is-multiline" v-if="showHours">
        <span class="column">{{ hoursLabel | translate }}</span>
        <b-field class="column">
          <p class="control">
            <b-button rounded :type="buttonsVariant" size="is-small" @click="decreaseHours">
              <icon-renderer icon="minus"/>
            </b-button>
          </p>
          <input v-model="model.hours" type="number" :min="0" :max="use24Hours ? 23 : 11" :step="hoursInterval" expanded/>
          <p class="control">
            <b-button rounded :type="buttonsVariant" size="is-small" @click="increaseHours">
              <icon-renderer icon="plus"/>
            </b-button>
          </p>
        </b-field>
      </div>

      <!-- Minutes input-->
      <div class="control columns is-vcentered is-multiline" v-if="showMinutes">
        <span class="column">{{ minutesLabel | translate }}</span>
        <b-field class="column">
          <p class="control">
            <b-button rounded :type="buttonsVariant" size="is-small" @click="decreaseMinutes">
              <icon-renderer icon="minus"/>
            </b-button>
          </p>
          <input v-model="model.minutes" type="number" :min="0" :max="59" :step="minutesInterval" expanded/>
          <p class="control">
            <b-button rounded :type="buttonsVariant" size="is-small" @click="increaseMinutes">
              <icon-renderer icon="plus"/>
            </b-button>
          </p>
        </b-field>

      </div>

      <!-- Seconds input-->
      <div class="control columns is-vcentered is-multiline" v-if="showSeconds">
        <span class="column">{{ secondsLabel | translate }}</span>
        <b-field class="column">
          <p class="control">
            <b-button rounded :type="buttonsVariant" size="is-small" @click="decreaseSeconds">
              <icon-renderer icon="minus"/>
            </b-button>
          </p>
          <input v-model="model.seconds" type="number" :min="0" :max="59" :step="minutesInterval" expanded/>
          <p class="control">
            <b-button rounded :type="buttonsVariant" size="is-small" @click="increaseSeconds">
              <icon-renderer icon="plus"/>
            </b-button>
          </p>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
  import { format } from 'date-fns';

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
        default: 'is-info'
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
        const time = new Date();
        time.setHours(this.model.hours);
        time.setMinutes(this.model.minutes);
        time.setSeconds(this.model.seconds);
        return format(time, this.format)
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
        if (!this.readonly) {
          this.showDialog = true
        }
      },
      updateModel(val) {
        if (val) {
          const time = new Date(val);
          this.model.hours = time.getHours();
          this.model.minutes = time.getMinutes();
          this.model.seconds = time.getSeconds();
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
