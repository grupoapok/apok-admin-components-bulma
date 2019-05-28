<template>
  <form @submit.prevent="doSubmit">
    <template v-for="(row,i) in fields">

      <template v-if="row.title">
        <h2 class="title is-2" :key="`title_${i}`">{{ row.title | translate }}</h2>
        <hr :key="`hr_${i}`">

        <div class="columns" :key="`form_row_${i}_${k}`" v-for="(fields,k) in row.fields">
          <div :class="['column', field.size && `is-${field.size}`]" v-for="(field, j) in fields"
               :key="`field_${i}_${k}_${j}`">
            <admin-form-field
              v-model="formVar[field.model]"
              :readonly="loading || readonly || field.loading"
              :error="errors[field.model]"
              :label="field.label"
              :type="field.type || 'text'"
              v-bind="field"
              @input="$emit('fieldChanged')"
            />
          </div>
        </div>
      </template>

      <template v-else>
        <div class="columns" :key="`form_row_${i}`">
          <div :class="['column', field.size && `is-${field.size}`]" v-for="(field, j) in row"
               :key="`field_${i}_${j}`">
            <admin-form-field
              v-model="formVar[field.model]"
              :readonly="loading || readonly || field.loading"
              :error="errors[field.model]"
              :label="field.label"
              :type="field.type"
              v-bind="field"
              @input="$emit('fieldChanged')"/>
          </div>
        </div>
      </template>
    </template>

    <slot></slot>

    <div class="columns">
      <div class="column is-12" v-if="!readonly">
        <div class="buttons" :class="`is-${buttonsAlignment}`">
          <b-button v-if="(submitButtonText || submitButtonIcon) && showSubmit" :type="submitButtonVariant" native-type="submit">
            <icon v-if="submitButtonIcon" :icon="submitButtonIcon"></icon>
            {{ submitButtonText | translate }}
          </b-button>
          <b-button v-if="(cancelButtonText || cancelButtonIcon) && showCancel" :type="cancelButtonVariant" @click="$emit('cancel')">{{
            cancelButtonText | translate }}
          </b-button>
        </div>
      </div>
      <div class="column is-12" v-else>
        <b-button v-if="(backButtonText || backButtonIcon) && showBack" :type="backButtonVariant" native-type="button" @click="$emit('cancel')">
          {{ backButtonText | translate }}
        </b-button>
      </div>
    </div>
  </form>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import AdminFormField from "./AdminFormField";

  export default {
    name: "AdminForm",
    components: { AdminFormField },
    inheritAttrs: false,
    props: {
      formVar: Object,
      readonly: Boolean,
      fields: {
        type: Array,
        default() {
          return [];
        }
      },
      loading: { type: Boolean, default: false },
      showDivider: { type: Boolean, default: true },
      buttonsAlignment: { type: String, default: 'left' },
      submitButtonText: { type: String, default: 'actions.save' },
      submitButtonVariant: { type: String, default: 'is-primary' },
      submitButtonIcon: { type: String, default: 'save' },
      cancelButtonText: { type: String, default: 'actions.cancel' },
      cancelButtonVariant: { type: String, default: null },
      cancelButtonIcon: { type: String, default: 'angle-left' },
      backButtonText: { type: String, default: 'actions.goBack' },
      backButtonVariant: { type: String, default: 'is-info' },
      backButtonIcon: { type: String, default: 'angle-left' },
      showCancel: { type: Boolean, default: true },
      showSubmit: { type: Boolean, default: true },
      showBack: { type: Boolean, default: true },
    },
    computed: {
      ...mapState('messages', { 'errors': 'fields' }),
    },
    methods: {
      ...mapActions('messages', ['resetFields']),
      doSubmit() {
        this.resetFields();
        this.$emit('submit');
      },
    }
  }
</script>

<style scoped>

</style>
