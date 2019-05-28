<template>
  <b-field :label="$attrs.label" :message="error" :type="error !== null && 'is-danger'">
    <b-field :type="error !== null && 'is-danger'">

      <p class="control" v-for="prepend in $attrs.prepend">
        <span class="button is-static">
          <icon v-if="prepend.icon" v-bind="prepend"/>
          <template v-else>{{ prepend }}</template>
        </span>
      </p>

      <b-input
        expanded
        v-if="isSimpleField"
        v-bind="$attrs.props"
        :readonly="readonly"
        :type="type"
        :value="value"
        :loading="$attrs.loading"
        @input="emitInput"
      ></b-input>

      <b-select
        expanded
        v-if="type === 'select'"
        :disabled="readonly"
        :value="value"
        :loading="$attrs.loading"
        @input="emitInput"
      >
        <template v-for="o in $attrs.props.options">
          <option v-if="typeof(o) === 'object'" :value="o.value">{{ o.label || o.text }}</option>
          <option v-else :value="o">{{ o }}</option>
        </template>
      </b-select>


      <b-radio
        v-if="type === 'radio'"
        v-for="(o,i) in processedOptions"
        :key="`radio_${i}`"
        :value="value"
        :native-value="o.value"
        :disabled="readonly"
        @input="emitInput"
      >
        {{ o.label | translate }}
      </b-radio>

      <b-checkbox
        v-if="type === 'checkbox'"
        v-for="(o,i) in processedOptions"
        :key="`check_${i}`"
        :value="value"
        :native-value="o.value"
        @input="emitInput"
        :true-value="o.value"
        :disabled="readonly"
      >
        {{ o.label | translate }}
      </b-checkbox>

      <admin-field-calendar
        v-if="type === 'calendar' || type === 'date'"
        v-bind="$attrs.props"
        :readonly="readonly"
        :value="value"
        @input="emitInput"
      ></admin-field-calendar>

      <admin-field-multi-select
        autocomplete
        v-if="type === 'multiselect'"
        :value="value"
        :readonly="readonly"
        :loading="$attrs.loading"
        :before-adding="checkDuplicates"
        :data="processedOptions"
        v-bind="$attrs.props"
        @input="emitInput"
        field="label"
      >

      </admin-field-multi-select>

      <admin-field-time-picker
        v-if="type === 'time'"
        v-bind="$attrs.props"
        :readonly="readonly"
        :value="value"
        @input="emitInput"
      ></admin-field-time-picker>

      <div :class="['file', value && 'has-name']" v-if="type === 'file'">
        <label class="file-label">
          <input type="file" class="file-input" @input="selectFile" v-bind="$attrs.props" :readonly="readonly">
          <span class="file-cta" v-if="!readonly">
                  <span class="file-icon">
                    <b-icon icon="file"></b-icon>
                  </span>
                  <span class="file-label">
                    Choose a file...
                  </span>
                </span>
          <span class="file-name" v-if="value">{{ value.name }}</span>
        </label>
      </div>

      <figure v-if="type === 'file' && thumbnail" class="image is-128x128" style="margin-left: 1rem;">
        <img :src="thumbnail"/>
      </figure>

      <p class="control" v-for="append in $attrs.append">
        <span class="button is-static">
          <icon :icon="append.icon" v-if="append.icon"/>
          <template v-else>{{ append }}</template>
        </span>
      </p>
    </b-field>

  </b-field>
</template>

<script>
  import AdminFieldCalendar from "./AdminFieldCalendar";
  import AdminFieldMultiSelect from "./AdminFieldMultiSelect";
  import AdminFieldTimePicker from "./AdminFieldTimePicker";

  export default {
    name: "AdminFormField",
    components: { AdminFieldMultiSelect, AdminFieldTimePicker, AdminFieldCalendar },
    props: {
      readonly: {
        type: Boolean,
        default: false
      },
      value: {
        default() {
          return null;
        }
      },
      type: {
        type: String,
        default: 'text',
      },
      error: {
        type: String,
        default: null
      }
    },
    computed: {
      isSimpleField() {
        return [
          "checkbox",
          "radio",
          "select",
          "multiselect",
          "calendar",
          "file",
          "vselect",
          "time"
        ].indexOf(this.type) === -1;
      },
      thumbnail() {
        if (this.type === 'file' && this.value && this.value.type.startsWith("image")) {
          if (typeof this.value === "string" || this.value instanceof String) {
            return this.value;
          }
          return window.URL.createObjectURL(this.value);
        }
        return null;
      },
      processedOptions() {
        if (this.$attrs.props && this.$attrs.props.options) {
          return this.$attrs.props.options.map(o => {
            if (typeof (o) === 'object' && o.hasOwnProperty('value') && o.hasOwnProperty('label')) {
              return o
            }
            return { label: `${o}`, value: `${o}` }
          })
        }
        return [];
      },
      checkDuplicates(va) {
        console.log('checkDuplicates', va);
        return false;
      }
    },
    methods: {
      emitInput(newVal) {
        this.$emit('input', newVal)
      },
      selectFile(val) {
        const { files } = val.target;
        if (this.$attrs.multiple) {
          this.emitInput(files)
        } else {
          this.emitInput(files[0])
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .file {
    width: 100%;
    .file-label {
      width: 100%;
      .file-name {
        max-width: 100% !important;
        flex-grow: 1;
      }
    }
  }
</style>
