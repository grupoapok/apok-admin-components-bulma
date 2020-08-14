<template>
  <footer class="footer">
    <slot>Footer</slot>
  </footer>
</template>
<script>
  export default {
    name: 'LayoutFooter'
  }
</script>

<style lang="scss" scoped>
  .footer {
    padding-bottom: 3rem;
  }

</style>
