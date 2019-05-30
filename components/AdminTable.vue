<template>
  <div>
    <div class="level">
      <div class="level-left">
        <div class="buttons is-left">
          <slot name="create_button">
            <router-link
              :to="createRoute"
              v-bind="createButtonProps"
              v-if="canCreate"
            >{{ createButtonText }}</router-link>
          </slot>
          <b-button type="is-info" v-if="filtersFields.length" @click="filtersActive = true">
            <icon icon="filter"/>
          </b-button>
          <b-button v-if="canReload" @click="$emit('refresh')">
            <icon icon="redo"/>
          </b-button>
        </div>
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

    <transition name="fade">
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
    </transition>

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
      :row-class="(row, index) => row.deleting && 'is-deleting'"
    >
      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p v-if="emptyIcon">
              <b-icon :icon="emptyIcon" size="is-large"></b-icon>
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
          >{{ getRecordField(props.row, field) }}</slot>
        </b-table-column>

        <b-table-column label>
          <div class="buttons is-right">
            <icon-button
              v-for="(a,j) in actions"
              :key="`action_${j}`"
              v-bind="a.props"
              :disabled="props.row.deleting"
              @click="$emit(`${a.action}`, props.row[idField])"
            >
              <template v-if="a.text">{{ a.text | translate }}</template>
            </icon-button>
          </div>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import camelCase from "lodash.camelcase";
import upperFirst from "lodash.upperfirst";

export default {
  name: "AdminTable",
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
          class: "button is-primary"
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
      return upperFirst(camelCase(this.$t(title)));
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

<style scoped lang="scss">
@import "~bulma";

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
