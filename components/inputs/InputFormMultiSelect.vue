<template>
  <!--<div :class="['multi-select-container', readonly && 'readonly']">
    <div class="multi-select-input input">
      <span
              class="selected-option"
              v-for="(selected, i) in Array.from(selectedOptions)"
              :key="`selectedOption_${i}`"
      >
        <icon-renderer
                icon="times"
                pack="fas"
                class="delete-option"
                @click.native="deleteOption(selected)"
                v-if="!readonly"
        />
        {{ selected.label | translate }}
      </span>
      <span
              class="text-secondary"
              v-if="Array.from(selectedOptions).length === 0"
              @click="$refs.input.focus()"
      >
        {{ placeholder | translate }}
      </span>
      <input
              type="text"
              ref="input"
              :readonly="readonly"
              v-model="filter"
              @focus="showOptionsList"
              @keyup.esc="hideOptions($event)"
              @keyup.down="changeHighlightedOption(1)"
              @keyup.up="changeHighlightedOption(-1)"
              @keydown.tab="chooseOption"
      />
    </div>
    <div
            class="multi-select-options"
            :class="[showOptions && 'd-block', !showOptions && 'd-none']"
    >
      <div
              v-for="(option, i) in filteredOptions"
              :key="`option_${i}`"
              class="option"
              :class="{'hovered': highlightedOption === i}"
              @click="select(option)"
              @mouseover="highlightedOption = i"
              @keyup.esc.native="hideOptions($event)"
      >
        {{ option.label | translate }}
      </div>
    </div>

  </div>-->
  <div class="columns">

    <b-dropdown :scrollable="options.length >= 4" aria-role="list">

      <button class="button is-link"  slot="trigger">
         <icon-renderer icon="chevron-down"/>
      </button>

      <b-dropdown-item
        v-for="(option, i) in {...options}"
        :key="`option_${i}`"
        aria-role="listitem"
        :value="option.value"
        @click="select(option)">
        {{ option.name }}
      </b-dropdown-item>
    </b-dropdown>
    <div class="control input">
        <span
          v-for="(selected, i) in Array.from(selectedOptions)"
          :key="`selected_${i}`"
          class="tag is-link">
          {{selected.name}}
          <button class="is-small delete" @click="deleteOption(selected)"/>
        </span>
      <span
        class="has-text-grey-lighter"
        v-if="selectedOptions.size === 0">
          {{ placeholder | translate }}
        </span>
    </div>

  </div>

  </template>

<script>

  export default {
    name: 'AdminFieldMultiSelect',
    data() {
      return {
        showOptions: false,
        selectedOptions: new Set(),
        filter: null,
        highlightedOption: -1
      };
    },
    props: {
      value: Array,
      options: {
        type: Array,
        default() {
          let options = [];
          for (let i=1; i <= 6; i++){
            options.push({id: i, name: `Option ${i}`, value: `Opt ${i} selected` })
          }
          return options;
        }
      },
      state: {
        type: String,
        default: null
      },
      readonly: {
        type: Boolean,
        default: false,
      },
      placeholder: {
        type: String,
        default: 'Select options...',
      },
    },
    computed: {
      filteredOptions() {
        if (this.filter) {
          return this.availableOptions.filter(o => o.label.match(new RegExp(`${this.filter}.*`)))
        }
        return this.availableOptions
      },
      availableOptions() {
        const selectedOptionsArr = Array.from(this.selectedOptions).map(so => so.value);
        return this.processedOptions.filter(o => selectedOptionsArr.indexOf(o.value) === -1);
      },
      processedOptions() {
        return this.options.map(o => {
          if (typeof (o) === 'object' && o.hasOwnProperty('value') && o.hasOwnProperty('label')) {
            return o;
          }
          if (typeof (o) === 'object' && o.hasOwnProperty('value') && o.hasOwnProperty('text')) {
            return {
              label: o.text,
              value: o.value
            };
          }
          return {
            label: `${o}`,
            value: o
          }
        })
      }
    },
    methods: {
      chooseOption(e) {
        if (this.highlightedOption !== -1) {
          e.preventDefault();
          this.select(this.filteredOptions[this.highlightedOption]);
          this.$refs.input.focus();
        }
      },
      changeHighlightedOption(inc) {
        this.highlightedOption = (this.highlightedOption + inc) % this.filteredOptions.length;
        if (this.highlightedOption < 0) {
          this.highlightedOption += this.filteredOptions.length;
        }
      },
      doEmit() {
        const values = Array.from(this.selectedOptions).map(v => v.value);
        this.$emit('input', values);
        //this.hideOptions()
      },
      select(value) {
        const newSet = new Set();
        this.selectedOptions.forEach(e => newSet.add(e));
        newSet.add(value);
        this.selectedOptions = newSet;
        this.doEmit();
      },
      deleteOption(selectedOption) {
        const newSet = new Set();
        this.selectedOptions.forEach((so) => {
          if (so.id !== selectedOption.id) {
            newSet.add(so);
          }
        });
        this.selectedOptions = newSet;

        this.doEmit();
      },
      showOptionsList() {
        if (!this.readonly) {
          this.showOptions = true;
        }
      },
      hideOptions() {
        this.showOptions = false;
        this.filter = null;
        this.highlightedOption = -1;
        this.$refs.input.blur();
      },
      updateSelected(value) {
        if (value) {
          this.selectedOptions = new Set();
          const optionsVals = this.processedOptions.map(o => o.value);
          value.forEach((v) => {
            const indexOfV = optionsVals.indexOf(v);
            if (indexOfV !== -1) {
              this.selectedOptions.add(this.processedOptions[indexOfV]);
            }
          });
        }
      },
    },
    watch: {
      value: {
        handler: 'updateSelected',
        immediate: true,
      },
      options() {
        this.updateSelected(this.value);
      },
    },
  };
</script>

<style lang="scss">
  .multi-select-container {
    display: flex;
    flex-direction: column;
    position: relative;
    flex-grow: 1;
    height: initial;

    .multi-select-input {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
    }

    &.readonly {
      background-color: $input-disabled-background-color;
    }

    input {
      border: none;
      background: none;
      min-width: 75px;
      width: 0;
      flex-grow: 1;
      outline: none;
      box-shadow: none;
    }

    .selected-option {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      height: 100%;
      white-space: nowrap;
      margin-right: .5rem;
      border: 1px solid $link;
      background: $link;
      color: white;
      font-size: .8rem;
      padding: 0 .5rem;
      border-radius: .25rem;

      .delete-option {
        cursor: pointer;
        margin-right: 0.5rem;
      }
    }

    /*.multi-select-options {
      width: 100%;
      border: 1px solid $input-border-color;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      position: absolute;
      background: white;
      top: calc(100% - 1px);
      left: 0;
      max-height: 150px;
      overflow: auto;
      z-index: 1;

      &.d-block {
        display: block;
      }

      &.d-none {
        display: none;
      }

      .option {
        cursor: pointer !important;
        padding: .375rem .75rem;

        &.hovered {
          background: $primary;
          color: $primary-invert;
        }
      }
    }*/
  }
</style>
