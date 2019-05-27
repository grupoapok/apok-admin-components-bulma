<template>
  <form @submit.prevent="$emit('submit')">
    <template v-for="(row,i) in fields">
      <template v-if="row.title">

      </template>
      <template v-else>
        <div class="columns" :key="`form_row_${i}`">
        <div :class="['column', field.size && `is-${field.size}`]" v-for="(field, j) in row" :key="`field_${i}_${j}`">
          <admin-form-field
            v-bind="field"
            :readonly="readonly"
            v-model="formVar[field.model]">
          </admin-form-field>
        </div>
        </div>
      </template>
    </template>

    <slot></slot>

    <div class="columns">
      <div class="column is-12" v-if="!readonly">
        <div class="buttons">
        <b-button v-if="submitButton && showSubmit" :type="submitButtonVariant" native-type="submit">{{ submitButton | translate }}</b-button>
        <b-button v-if="cancelButton && showCancel" :type="cancelButtonVariant" @click="goBack">{{ cancelButton | translate }}</b-button>
        </div>
      </div>
      <div class="column is-12" v-else>
        <b-button v-if="backButton && showBack" :type="backButtonVariant" native-type="button" @click="goBack">{{ backButton | translate }}</b-button>
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
      readonly: Boolean,
      fields: {
        type: Array,
        default() {
          return [];
        }
      },
        showDivider: { type: Boolean, default: true },
        buttonsAlignment: { type: String, default: 'left' },
        submitButton: { type: String, default: 'actions.save' },
        submitButtonVariant: { type: String, default: 'is-primary' },
        submitButtonIcon: { type: String, default: 'save' },
        cancelButton: { type: String, default: 'actions.cancel' },
        cancelButtonVariant: { type: String, default: null },
        cancelButtonIcon: { type: String, default: 'angle-left' },
        backButton: { type: String, default: 'actions.goBack' },
        backButtonVariant: { type: String, default: 'is-info' },
        backButtonIcon: { type: String, default: 'angle-left' },
        showCancel: { type: Boolean, default: true },
        showSubmit: { type: Boolean, default: true },
        showBack: { type: Boolean, default: true },
        inline: {type: Boolean, default: false}
    },
    methods: {
      goBack(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>

</style>
