<template>
  <div>
    <div class="level">
      <div class="level-left">
        <div class="buttons is-left">
          <slot name="create_button">
            <button-renderer v-bind="createButtonProps" @click="$router.push(createRoute)" v-if="canCreate">
              {{ createButtonText | translate }}
            </button-renderer>
          </slot>
          <button-renderer type="is-info" v-if="filtersFields.length" @click="filtersActive = true">
            <icon-renderer icon="filter"/>
          </button-renderer>
          <button-renderer v-if="canReload" @click="$emit('refresh')">
            <icon-renderer icon="redo"/>
          </button-renderer>
        </div>
      </div>
      <div class="level-right" style="position: relative">
        <pagination-renderer
          :page-size="pageSize"
          :current-page="currentPage"
          :total-pages="totalPages"
          @pageChanged="$emit('pageChanged', $event)"
          @pageSizeChanged="$emit('pageSizeChanged', $event)"
        />
        <!--<div style="display: inline-flex;align-items: center;margin-right: 1rem;" v-if="canChangePageSize">
          Mostrar
          <b-select :value="pageSize" @input="(e) => $emit('pageSizeChanged', e)">
            <option
                    v-for="option in [1,5,10,15,20,25,50,100]"
                    :value="option"
                    :key="option">
              {{ option }}
            </option>
          </b-select>
          por página
        </div>
        <b-pagination
                v-if="totalPages > 1"
                :total="totalPages * pageSize"
                :per-page="pageSize"
                :current="currentPage"
                @change="$emit('pageChanged', $event)"
        />
        <b-loading :active="loading" :is-full-page="false" :can-cancel="false"/>-->
      </div>
    </div>

    <!--<transition name="fade">
      <div class="box" id="list-filters" v-if="filtersActive">
        <b-button type="is-white" class="close" @click="filtersActive = false">&times;</b-button>
        <admin-form
                :form-var="filters"
                :fields="filtersFields"
                :show-cancel="false"
                submit-button-icon="filter"
                :submit-button-text="null"
                @submit="$emit('filtersUpdated')"
        />
      </div>
    </transition>-->

    <b-table
            :data="items"
            :loading="loading"
            :paginated="totalPages > 1"
            backend-pagination
            :hoverable="hover"
            :current-page="currentPage"
            :total="totalPages * pageSize"
            :per-page="pageSize"
            @page-change="$emit('pageChanged', $event)"
            backend-sorting
            :default-sort-direction="sortDirection"
            :default-sort="[sortField, sortDirection]"
            @sort="onSort"
            :row-class="(row, index) => row.deleting && 'is-deleting'"
    >
      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p v-if="emptyIcon">
              <icon-renderer :icon="emptyIcon" size="is-large"/>
            </p>
            <p v-if="emptyMessage">{{ emptyMessage | translate }}</p>
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
          <slot
                  :item="props.row"
                  :name="`${field.key || field}`"
          >{{ getRecordField(props.row, field) }}
          </slot>
        </b-table-column>

        <b-table-column label>
          <div class="buttons is-right">
            <button-renderer
                    v-for="(a,j) in actions"
                    :key="`action_${j}`"
                    v-bind="a.props"
                    :disabled="props.row.deleting"
                    @click="$emit(`${a.action}`, props.row[idField])"
            >
              <template v-if="a.text">{{ a.text | translate }}</template>
            </button-renderer>
          </div>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>

  import upperFirst from "lodash.upperfirst";
  import IconButton from "./IconButton";

  export default {
    name: "AdminTable",
    components: { IconButton },
    data() {
      return {
        filtersActive: false
      };
    },
    props: {
      idField: {
        type: String,
        default: "id"
      },
      loading: {
        type: Boolean,
        default: false
      },
      hover: {
        type: Boolean,
        default: false
      },
      emptyIcon: {
        type: String,
        default: null
      },
      emptyMessage: {
        type: String,
        default: "Nothing Here."
      },
      totalPages: {
        type: Number,
        default: 1
      },
      currentPage: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 1
      },
      canCreate: {
        type: Boolean,
        default: true
      },
      canReload: {
        type: Boolean,
        default: true
      },
      canChangePageSize: {
        type: Boolean,
        default: true
      },
      createRoute: {
        type: [String, Object],
        default() {
          return null;
        }
      },
      createButtonText: {
        type: String,
        default: "New"
      },
      createButtonProps: {
        type: Object,
        default() {
          return {
            type: 'is-success',
            icon: 'plus',
          };
        }
      },
      items: {
        type: Array,
        default() {
          return [];
        }
      },
      fields: {
        type: Array,
        default() {
          return [];
        }
      },
      actions: {
        type: Array,
        default() {
          return [];
        }
      },
      sortField: {
        type: String,
        default: null
      },
      sortDirection: {
        type: String,
        default: "asc"
      },
      filters: {
        type: Object,
        default() {
          return {};
        }
      },
      filtersFields: {
        type: Array,
        default() {
          return [];
        }
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
        this.$emit("sort", { field, order });
      },
      evalActionCondition(record, action) {
        if (!action.condition) {
          return true;
        }

        const { field, operator, value } = action.condition;
        const fieldValue = this.getRecordField(record, field);

        switch (operator) {
          case "=":
          case "==":
          case "===":
            return fieldValue === value;
          case ">":
            return fieldValue > value;
          case ">=":
            return fieldValue >= value;
          case "<":
            return fieldValue < value;
          case "<=":
            return fieldValue <= value;
          case "!=":
          case "!==":
            return fieldValue !== value;
          default:
            return false;
        }
      },
      getFieldTitle(field) {
        let title = field;
        if (typeof field === "object") {
          title = field.label || field.key;
        }
        return upperFirst(this.$t(title));
      },
      getRecordField(record, field) {
        let fieldKey = field;
        let fieldValue = null;

        if (typeof field === "object") {
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
      }
    }
  };
</script>

<style lang="scss" scoped>
  #list-filters {
    position: relative;
    width: 100%;
    padding-top: 2.5rem;

    .close {
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  tr {
    &.is-deleting {
      td {
        background: rgba($danger, 0.5);
        color: $text-light !important;

        &:not(:last-child) {
          text-decoration: line-through;
        }
      }
    }
  }
</style>
