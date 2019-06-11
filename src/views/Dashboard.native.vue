<template native>
    <Page actionBarHidden="false" backgroundSpanUnderStatusBar="true">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Dashboard"></Label>
            <NavigationButton visibility="collapsed" />
        </ActionBar>
        <FlexboxLayout class="page" verticalAlignment="center">
            <Button :text="'In/Uit Klokken'" @tap="clickClocking" class="btn btn-primary m-t-20" />
            <Button :text="'Pauze'" @tap="clickPause" class="btn btn-primary m-t-20" />
            <Button text="Log out" @tap="clickLogout" class="btn btn-secondary" />
        </FlexboxLayout>
    </Page>
</template>

<script>
    import axios from "axios/index"
    import LoginPage from "./Login.native.vue";
    import ClockingPage from "./Clock.native.vue";
    import PausePage from "./Break.native.vue";
    import { request } from 'http';
    import { mapGetters } from 'vuex';
    import 'nativescript-localstorage';

    //const { VUE_APP_MODE, VUE_APP_PLATFORM } = process.env;

    export default {
        name: "Login",
        data () {
            return {
                props:[currentUser]
            };
        },
        computed: {
        ...mapGetters({ currentUser: 'currentUser' })
        },
        methods: {
            clickLogout() {
                this.$navigateTo(LoginPage, {
                    props: {
                        currentUser
                    },
                    animated: true,
                    transition: {
                        name: "slideBottom",
                        duration: 380,
                        curve: "easeOut"
                    },
                    clearHistory: true
                });
            },
            clickPause() {
                this.$navigateTo(PausePage, {
                    props: {
                        currentUser
                    },
                    animated: true,
                    transition: {
                        name: "slideTop",
                        duration: 380,
                        curve: "easeIn"
                    }
                });
            },
            clickClocking() {
                this.$navigateTo(ClockingPage, {
                    props: {
                        currentUser
                    },
                    animated: true,
                    transition: {
                        name: "slideTop",
                        duration: 380,
                        curve: "easeIn"
                    }
                });
            },
            alert(message) {
                return alert({
                    title: "Oops",
                    okButtonText: "OK",
                    message: message
                });
            }
        },
        mounted () {
            this.getUserData()
        }
    }
</script>

<style scoped>
    .page {
        align-items: center;
        flex-direction: column;
    }

    .form {
        margin-left: 30;
        margin-right: 30;
        flex-grow: 2;
        vertical-align: middle;
    }

    .logo {
        margin-bottom: 12;
        height: 90;
        font-weight: bold;
    }

    .header {
        horizontal-align: center;
        font-size: 25;
        font-weight: 600;
        margin-bottom: 70;
        text-align: center;
        color: #00A2D3;
    }

    .input-field {
        margin-bottom: 25;
    }

    .input {
        font-size: 18;
        placeholder-color: #A8A8A8;
    }

    .input-field .input {
        font-size: 54;
    }

    .btn-primary {
        height: 50;
        margin: 30 5 15 5;
        background-color: #00A2D3;
        border-radius: 5;
        font-size: 20;
        font-weight: 600;
    }

    .btn-secondary {
        height: 50;
        margin: 30 5 15 5;
        background-color: #eaeaea;
        border-radius: 5;
        color: #00A2D3;
        font-size: 20;
        font-weight: 600;
    }

    .login-label {
        horizontal-align: center;
        color: #A8A8A8;
        font-size: 16;
    }

    .sign-up-label {
        margin-bottom: 20;
    }

    .bold {
        color: #000000;
    }
</style>