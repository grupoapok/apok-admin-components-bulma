<template>
    <div class="messages-container">
        <b-notification
                v-for="message in messages"
                :key="`message_${message.id}`"
                has-icon
                auto-close
                :duration="10000"
                :icon="messageIcon(message)"
                :type="`is-${message.type}`"
                @close="dismissMessage(message.id)"
                :title="' '"
        >
            {{ message.text | translate }}
        </b-notification>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        name: 'AdminMessages',
        computed: {
            ...mapState('messages', ['messages']),
        },
        methods: {
            ...mapActions('messages', ['dismissMessage']),
            messageIcon(message) {
                if (message.type === 'success') {
                    return 'check';
                }
                if (message.type === 'warning') {
                    return 'warning';
                }
                if (message.type === 'info') {
                    return 'info';
                }
                return 'danger'
            },
        },
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
