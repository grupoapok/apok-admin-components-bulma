<template>
  <!-- STAR OF SAMPLE CONTENT-->
  <div class="dashboard-container">
    <template v-if="sample">
      <div class="column">
        <div class="title-container">
          <section class="hero is-link is-bold">
            <div class="hero-body">
              <h1 class="title is-3">Dashboard</h1>
              <h1 class="subtitle is-5">Bulma Components</h1>
            </div>
          </section>
        </div>
        <div class="columns is-multiline">
          <div class="column" v-for="i in 4" :key="`card_${i}`">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <p class="card-header-title title is-4">Card Title</p>
                </div>
                <div class="content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus nec iaculis mauris.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- END OF SAMPLE CONTENT -->

    <div class="columns is-multiline" v-for="row in rows" :key="`row_${row}`">
      <div class="column" v-for="col in columns" :key="`column_${col}`">
        <slot :name="`tile_${row}_${col}`"/>
      </div>
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
      sample: {
        type: Boolean,
        default: () => false,
      }

    }
  }

</script>

<style lang="scss" scoped>

  .title-container {
    padding-bottom: 24px;
  }

  .dashboard-container {
    padding: 24px;
  }
</style>
