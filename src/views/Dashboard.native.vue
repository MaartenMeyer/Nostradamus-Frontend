<template native>
    <Page actionBarHidden="false" backgroundSpanUnderStatusBar="true">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Dashboard"></Label>
            <NavigationButton class="LogoutButton" android.systemIcon="ic_menu_set_as" text="Log uit" @tap="clickLogout" />
        </ActionBar>
        <FlexboxLayout class="page">
            <StackLayout class="form" verticalAlignment="center">
                <Label class="box">Welkom {{currentUser.userName}}</Label>

<!--                <Label class="box" text=" Welkom {{currentUser.userId}}"/>-->
                <Button class="button" @tap="clickClocking()"> In/Uit Klokken </Button>
                <Button class="button" @tap="clickPause()"> Pauze </Button>
            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
    import axios from "axios/index"

    import PausePage from "./Break.native.vue";
    import { request } from 'http';
    import { mapGetters } from 'vuex';
    import 'nativescript-localstorage';

    //const { VUE_APP_MODE, VUE_APP_PLATFORM } = process.env;

    export default {
        name: "Dashboard",
        data () {
            return {
                //props:[currentUser]
            };
        },
        created(){
            if(!localStorage.token){
                this.$goto('login');
            }
        },
        computed: {
            ...mapGetters({ currentUser: 'currentUser' })
        },
        methods: {
            clickLogout() {
                this.$goto('logout');
            },
            clickPause() {
                this.$goto('break');
            },
            clickClocking() {
                this.$goto('clock');
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
            //this.getUserData()
        }
    }
</script>

<style scoped>
    .action-bar-title{
        font-size: 25px;
    }

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

    .box {
        horizontal-align: center;
        font-size: 35;
        margin-bottom: 70;
        text-align: center;
        color: #00A0D1;
    }

    .button {
        height: 50;
        margin: 30 5 15 5;
        background-color: #00A0D1;
        border-radius: 10px;
        font-size: 20px;
        /*margin-left: 10px;*/
        /*margin-right: 10px;*/
        color: white;
    }


</style>