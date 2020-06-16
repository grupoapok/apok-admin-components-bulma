<template>
  <div class="column">
    <div style="display: inline-flex; align-items: center; margin-right: 1rem;">
      Mostrar
      <b-select size="is-small" class="mx-2" :value="pageSize" @input="(e) => $emit('pageSizeChanged', e)">
        <option
          :key="option"
          :value="option"
          v-for="option in pageSizes">
          {{ option }}
        </option>
      </b-select>
      por página
    </div>
    <div style="display: inline-flex; align-items: center;">
      <b-pagination
        size="is-small"
        :current="currentPage"
        :per-page="pageSize"
        :total="totalPages * pageSize"
        @change="$emit('pageChanged', $event)"
        v-if="totalPages > 1"
      />
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Pagination',
    data() {
      return {
        pageSize: 5,
      }
    },
    props: {

      pageSizes: {
        type: Array,
        default() {
          return [1, 5, 10, 15, 20, 25, 50, 100];
        }
      },
      currentPage: {
        default: 1,
      },
      totalPages: {
        default: 1,
      }
    }
  }
</script>
<style scoped lang="scss">
  .mx-2 {
    margin-left: 1em;
    margin-right: 1em;
  }
</style>
