<template>
  <div class="dashboard-container">

  <!-- STAR OF SAMPLE CONTENT-->
    <template v-if="sample">
      <div class="columns is-multiline">

        <div class="column">
          <div class="card has-background-info">
            <div class="card-header">
              <div class="card-header-title">
                <p class="has-text-white"> Current workers in office </p>
              </div>
            </div>
            <div class="card-content sm-y-padding">
              <p class="title is-size-3 has-text-white"> 23 </p>
              <p class="subtitle is-size-5 has-text-white"> Workers </p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card has-background-grey-light">
            <div class="card-header">
              <div class="card-header-title">
                <p> Ongoing Servers </p>
              </div>
            </div>
            <div class="card-content sm-y-padding">
              <p class="title is-size-3"> 12 </p>
              <p class="subtitle"> Servers </p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card has-background-success">
            <div class="card-header">
              <div class="card-header-title">
                <p class="has-text-white"> Last month revenue </p>
              </div>
            </div>
            <div class="card-content sm-y-padding">
              <p class="title is-size-3 has-text-white"> 180% </p>
              <p class="subtitle  has-text-white"> Revenue </p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card has-background-warning">
            <div class="card-header">
              <div class="card-header-title">
                <p> Inventory </p>
              </div>
            </div>
            <div class="card-content sm-y-padding">
              <p class="title is-size-3"> 3 left </p>
              <p class="subtitle "> Items </p>
            </div>
          </div>
        </div>
      </div>

      <div class="columns">

        <div class="column">
          <div class="card">
            <div class="card-content">
              <chart-renderer chart="bar" :height="40" :width="100"/>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <div class="card-content">
              <chart-renderer chart="line" :height="40" :width="100"/>
            </div>
          </div>
        </div>
      </div>

      <div class="columns is-multiline">

        <div class="column">
          <div class="card">
            <div class="card-content">
              <chart-renderer chart="pie" :width="100"/>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <div class="card-content">
              <chart-renderer chart="radar" :width="100"/>
            </div>
          </div>
        </div>
      </div>

      <div class="columns is-multiline">
        <div class="column">
          <div class="card">
            <div class="card-content">
              <table-renderer/>
            </div>
          </div>
        </div>
      </div>

    </template>
    <!-- END OF SAMPLE CONTENT -->

    <div class="columns" :class="[isMultiline && 'is-multiline']" v-for="row in rows" :key="`row_${row}`">
      <template v-for="col in columns" >
        <div class="column" :key="`column_${col}`" v-if="hasSlot(row, col)">
          <slot :name="`tile_${row}_${col}`"/>
        </div>
      </template>

    </div>

  </div>
</template>

<script>

  export default {
    props: {
      rows: {
        type: Number,
        default: () => 0,
      },
      columns: {
        type: Number,
        default: () => 0,
      },
      isMultiline:{
        type: Boolean,
        default: () => true,
      },
      sample: {
        type: Boolean,
        default: () => false,
      }
    },
    methods: {
      hasSlot(row, col) {
        return !!this.$slots[`tile_${row}_${col}`]
      }
    }
  }

</script>

<style lang="scss" scoped>

  .sm-y-padding {
    padding-bottom: 0.75rem;
    padding-top: 0.25rem;
  }
  .title-container {
    padding-bottom: 24px;
  }

  .dashboard-container {
    padding: 24px;
  }
</style>
