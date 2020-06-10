<template>
  <div class="messages-container">
    <b-notification
      :duration="10000"
      :key="`message_${message.id}`"
      :title="' '"
      :type="`is-${message.type}`"
      @close="() => $emit('messageDismissed', message.id)"
      auto-close
      class="is-light"
      has-icon
      v-bind="$attrs"
      v-for="message in messages"
    >
      {{ message.text | translate }}
    </b-notification>
  </div>
</template>

<script>
  export default {
    name: 'AdminMessages',
    inheritAttrs: false,
    props: {
      messages: {
        type: Array,
        default() {
          return []
        }
      }
    }
  };
</script>

<style lang="scss">
  .messages-container {
    position: fixed;
    z-index: 99;
    top: calc(57px + 1em);
    right: 1em;

    .alert-dismissible {
      padding-right: 3rem !important;

      .close {
        padding-left: 0.75rem !important;
      }
    }
  }
</style>
