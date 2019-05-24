<template>
  <div>
    <div class="level">
      <div class="level-left">
        <router-link :to="createRoute" v-bind="createButtonProps" v-if="canCreate">
          {{ createButtonText }}
        </router-link>
      </div>
      <div class="level-right" style="position: relative">
        <b-pagination
          :total="totalPages * pageSize"
          :per-page="pageSize"
          :current="currentPage"
          @change="$emit('pageChanged', $event)"
        />
        <b-loading :active="loading" :is-full-page="false" :can-cancel="false"></b-loading>
      </div>
    </div>

    <b-table
      :data="items"
      :loading="loading"

      paginated
      backend-pagination
      :current-page="currentPage"
      :total="totalPages * pageSize"
      :per-page="pageSize"
      @page-change="$emit('pageChanged', $event)"

      backend-sorting
      :default-sort-direction="sortDirection"
      :default-sort="[sortField, sortDirection]"
      @sort="onSort"
    >
      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p v-if="emptyIcon">
              <b-icon :icon="emptyIcon" size="is-large"></b-icon>
            </p>
            <p v-if="emptyMessage">{{ emptyMessage }}</p>
          </div>
        </section>
      </template>
      <template v-slot:default="props">
        <b-table-column
          v-for="(field, i) in tableFields"
          :label="getFieldTitle(field)"
          :field="field.key || field"
          :sortable="field.sortable"
          :key="`column_${i}`"
        >
          <slot :item="props.row" :name="`${field.key || field}`">
            {{ getRecordField(props.row, field) }}
          </slot>
        </b-table-column>

        <b-table-column label="">
          <div class="buttons is-right">
            <b-button
              v-for="(a,j) in actions"
              :key="`action_${j}`"
              v-bind="a.props"
              @click="$emit(`${a.action}`, props.row[idField])">
              <span v-if="a.text">{{ a.text }}</span>
            </b-button>
          </div>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
  import BButton from "buefy/src/components/button/Button";
  import BPagination from "buefy/src/components/pagination/Pagination";
  import camelCase from "lodash.camelcase";
  import BTableColumn from "buefy/src/components/table/TableColumn";

  export default {
    name: "AdminTable",
    components: { BPagination, BButton, BTableColumn },
    props: {
      idField: {
        type: String,
        default: "id"
      },
      loading: {
        type: Boolean,
        default: false
      },
      emptyIcon: {
        type: String,
        default: 'emoticon-sad'
      },
      emptyMessage: {
        type: String,
        default: 'Nothing Here.'
      },
      totalPages: {
        type: Number,
        default: 1,
      },
      currentPage: {
        type: Number,
        default: 1,
      },
      pageSize: {
        type: Number,
        default: 1,
      },
      canCreate: {
        type: Boolean,
        default: true
      },
      createRoute: {
        type: Object,
        default() {
          return null
        }
      },
      createButtonText: {
        type: String,
        default: 'New'
      },
      createButtonProps: {
        type: Object,
        default() {
          return {
            class: 'button is-primary'
          }
        }
      },
      items: {
        type: Array,
        default() {
          return []
        }
      },
      fields: {
        type: Array,
        default() {
          return []
        }
      },
      actions: {
        type: Array,
        default() {
          return []
        }
      },
      sortField: {
        type: String,
        default: null,
      },
      sortDirection: {
        type: String,
        default: 'asc',
      }
    },
    computed: {
      tableFields() {
        if (this.fields.length === 0) {
          if (this.items[0]) {
            return Object.keys(this.items[0]);
          }
        }
        return this.fields;
      }
    },
    methods: {
      onSort(field, order) {
        this.$emit('sort', { field, order });
      },
      getFieldTitle(field) {
        if (typeof field === 'object') {
          return this.$t(field.label || camelCase(field.key));
        }
        return camelCase(this.$t(field));
      },
      getRecordField(record, field) {
        let fieldKey = field;
        let fieldValue = null;

        if (typeof field === 'object') {
          fieldKey = field.key;
        }

        const keys = fieldKey.split(".");
        fieldValue = record[keys[0]];

        for (let i = 1; i < keys.length; i++) {
          if (fieldValue && fieldValue.hasOwnProperty(keys[i])) {
            fieldValue = fieldValue[keys[i]];
          } else {
            break;
          }
        }

        return fieldValue;
      },
    }
  }
</script>

<style scoped>

</style>
