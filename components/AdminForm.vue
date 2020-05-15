<template>
  <form @submit.prevent="doSubmit">
    <b-loading :active="loading" :can-cancel="false" :is-full-page="false"/>
    <template v-for="(row,i) in fields">

      <template v-if="row.title">
        <h2 :key="`title_${i}`" class="title is-2">{{ row.title | translate }}</h2>
        <hr :key="`hr_${i}`">

        <div :key="`form_row_${i}_${k}`" class="columns" v-for="(fields,k) in row.fields">
          <div :class="['column', field.size && `is-${field.size}`]" :key="`field_${i}_${k}_${j}`"
               v-for="(field, j) in fields">
            <admin-form-field
              :error="errors[field.model]"
              :label="field.label"
              :readonly="loading || readonly || field.loading"
              :type="field.type || 'text'"
              @input="$emit('fieldChanged')"
              v-bind="field"
              v-model="formVar[field.model]"
            />
          </div>
        </div>
      </template>

      <template v-else>

        <div :key="`form_row_${i}`" class="columns">
          <div :class="['column', field.size && `is-${field.size}`]" :key="`field_${i}_${j}`"
               v-for="(field, j) in row">
            <admin-form-field
              :error="errors[field.model]"
              :label="field.label"
              :readonly="loading || readonly || field.loading"
              :type="field.type"
              @input="$emit('fieldChanged')"
              v-bind="field"
              v-model="formVar[field.model]"/>
          </div>
        </div>
      </template>
    </template>

    <slot></slot>

    <div class="columns">
      <div class="column is-12" v-if="!readonly">
        <div :class="`is-${buttonsAlignment}`" class="buttons">
          <button-renderer
            :type="submitButtonVariant"
            class="is-fullwidth-mobile"
            native-type="submit"
            v-bind="submitButtonIcon"
            v-if="(submitButtonText || submitButtonIcon) && showSubmit"
          >
            {{ submitButtonText | translate }}
          </button-renderer>
          <button-renderer
            :type="cancelButtonVariant"
            @click="$emit('cancel')"
            class="is-fullwidth-mobile" v-bind="cancelButtonIcon"
            v-if="(cancelButtonText || cancelButtonIcon) && showCancel">
            {{ cancelButtonText | translate }}
          </button-renderer>
        </div>
      </div>
      <div class="column is-12" v-else>
        <button-renderer
          :icon="backButtonIcon"
          :type="backButtonVariant"
          @click="$emit('cancel')"
          class="is-fullwidth-mobile" native-type="button"
          v-if="(backButtonText || backButtonIcon) && showBack">
          {{ backButtonText | translate }}
        </button-renderer>
      </div>
    </div>
  </form>
</template>

<script>
  import AdminFormField from "./AdminFormField";

  export default {
    name: "AdminForm",
    components: { AdminFormField },
    inheritAttrs: false,
    props: {
      formVar: Object,
      errors: {
        type: Object,
        default() {
          return {};
        },
      },
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
      submitButtonIcon: {
        type: Object,
        default() {
          return {
            icon: 'check',
          }
        }
      },
      cancelButtonText: { type: String, default: 'actions.cancel' },
      cancelButtonVariant: { type: String, default: null },
      cancelButtonIcon: {
        type: Object,
        default() {
          return {
            icon: 'angle-left',
          }
        }
      },
      backButtonText: { type: String, default: 'actions.goBack' },
      backButtonVariant: { type: String, default: 'is-info' },
      backButtonIcon: {
        type: Object,
        default() {
          return {
            icon: 'angle-left',
          }
        }
      },
      showCancel: { type: Boolean, default: true },
      showSubmit: { type: Boolean, default: true },
      showBack: { type: Boolean, default: true },
    },
    methods: {
      doSubmit() {
        this.$emit('submit');
      },
    }
  }
</script>

<style scoped>
  form {
    position: relative;
  }
</style>
