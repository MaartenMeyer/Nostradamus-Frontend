<template web>
    <div id="app">
        <component :is="layout">
            <transition name="fade" mode="out-in">
                <router-view/>
            </transition>

        </component>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    const default_layout = "layout";

    export default {
        name: 'app',
        computed: {
            layout() {
                return(this.$route.meta.layout || default_layout) + '-layout';
            },
            ...mapGetters({ currentUser: 'currentUser' })
        },
        created(){
            this.checkLogin();
        },
        updated(){
            this.checkLogin();
        },
        methods: {
            checkLogin(){
                if (!this.currentUser && this.$route.path !== '/') {
                    this.$router.push('/?redirect=' + this.$route.path);
                }
            }
        }
    }
</script>

<style>
    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.5s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }
</style>
