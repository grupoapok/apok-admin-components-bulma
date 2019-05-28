<template>
    <nav :class="['navbar', color && `is-${color}`]" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="/">
                {{ $constants.APP_NAME }}
            </a>

            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
               @click="active = !active"
               data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" :class="['navbar-menu', active && 'is-active']">
            <div class="navbar-start is-hidden-desktop">

            </div>

            <div class="navbar-end">
                <div class="navbar-item has-dropdown" :class="[showLocaleMenu && 'is-active']">
                    <a class="navbar-link" @click="showLocaleMenu = !showLocaleMenu">{{ $i18n.locale() | uppercase }}</a>
                    <div class="navbar-dropdown">
                        <a class="navbar-item" v-for="(locale, i) in locales" :key="`locale_${i}`"
                           @click="() => {$i18n.set(locale); showLocaleMenu = false}">
                            {{ locale | uppercase }}
                        </a>
                    </div>
                </div>
                <div class="navbar-item has-dropdown" :class="[showUserMenu && 'is-active']">
                    <a class="navbar-link" @click="showUserMenu = !showUserMenu">{{ user.name }}</a>
                    <div class="navbar-dropdown is-right">
                        <router-link class="navbar-item" :to="{ name: 'Profile' }">
                            <b-icon icon="user"></b-icon>
                            Profile
                        </router-link>
                        <a class="navbar-item" @click.prevent="() => { $emit('onLogout'); showUserMenu = false}">
                            <b-icon icon="sign-out-alt"></b-icon>
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "AdminNavbar",
        data() {
            return {
                active: false,
                showLocaleMenu: false,
                showUserMenu: false,
            }
        },
        computed: {
            locales() {
                return this.$i18n.locales();
            },
        },
        props: {
            user: {
                type: Object,
                default() {
                    return {
                        name: ''
                    };
                },
            },
            color: {
                type: String,
                default: 'light'
            },
            spaced: Boolean,
        }
    }
</script>

<style scoped>

</style>
