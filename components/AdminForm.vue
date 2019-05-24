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
        <b-button type="is-primary" native-type="submit">Submit</b-button>
        <b-button type="is-info" @click="goBack">Cancelar</b-button>
        </div>
      </div>
      <div class="column is-12" v-else>
        <b-button type="is-info" native-type="button" @click="goBack">Go Back</b-button>
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
      }
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
