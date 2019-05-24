<template>
  <b-field :label="$attrs.label">
    <b-field>

      <b-input
        expanded
        v-if="isSimpleField"
        v-bind="$attrs.props"
        :readonly="readonly"
        :type="type"
        :value="value"
        @input="emitInput"
      ></b-input>

      <b-select
        expanded
        :disabled="readonly"
        v-if="type === 'select'"
        :value="value"
        @input="emitInput"
      >
        <template v-for="o in $attrs.props.options">
          <option v-if="typeof(o) === 'object'" :value="o.value">{{ o.label || o.text }}</option>
          <option v-else :value="o">{{ o }}</option>
        </template>
      </b-select>

      <template v-if="type === 'radio'" v-for="o in $attrs.props.options">
        <b-radio v-if="typeof(o) === 'object'" :value="value" :native-value="o.value" @input="emitInput"
                 :disabled="readonly">
          {{ o.label || o.text }}
        </b-radio>
        <b-radio v-else :value="value" :native-value="o" @input="emitInput"
                 :disabled="readonly">{{ o }}
        </b-radio>
      </template>

      <template v-if="type === 'checkbox'" v-for="o in $attrs.props.options">
        <b-checkbox v-if="typeof(o) === 'object'" :value="value" :native-value="o.value" @input="emitInput"
                    :true-value="o.value"
                    :disabled="readonly">
          {{ o.label || o.text }}
        </b-checkbox>
        <b-checkbox v-else :value="value" :native-value="o" @input="emitInput" :true-value="o"
                    :disabled="readonly"
        >{{ o }}
        </b-checkbox>
      </template>

      <calendar
        v-if="type === 'calendar' || type === 'date'"
        v-bind="$attrs.props"
        :readonly="readonly"
        :value="value"
        @input="emitInput"
      ></calendar>

      <b-taginput
        v-if="type === 'multiselect'"
        :value="value"
        autocomplete
        :readonly="readonly"
        v-bind="$attrs.props"
        :data="$attrs.options"
        @input="emitInput"
        field="label"
      >
        <template v-slot:default="props">
          {{ props.option.label }}
        </template>
      </b-taginput>

      <time-picker
        v-if="type === 'time'"
        v-bind="$attrs.props"
        :readonly="readonly"
        :value="value"
        @input="emitInput"
      ></time-picker>

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
          <b-icon :icon="append.icon" v-if="append.icon"/>
          <template v-else>{{ append }}</template>
        </span>
      </p>
    </b-field>

  </b-field>
</template>

<script>
  import BButton from "buefy/src/components/button/Button";
  import BUpload from "buefy/src/components/upload/Upload";
  import Calendar from "./Calendar";
  import TimePicker from "./TimePicker";

  export default {
    name: "AdminFormField",
    components: { BButton, BUpload, TimePicker, Calendar },
    props: {
      readonly: Boolean,
      value: {
        default() {
          return null;
        }
      },
      type: {
        type: String,
        default: 'text',
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
        if (this.value && this.value.type.startsWith("image")) {
          if (typeof this.value === "string" || this.value instanceof String) {
            return this.value;
          }
          return window.URL.createObjectURL(this.value);
        }
        return null;
      },
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
