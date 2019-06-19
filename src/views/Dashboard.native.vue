<template native>
    <Page actionBarHidden="false" backgroundSpanUnderStatusBar="true">
        <ActionBar class="action-bar">
            <NavigationButton visibility="hidden" ></NavigationButton>
            <Label class="action-bar-title" text="Dashboard"></Label>
            <Button class="uitlog" android.systemIcon="ic_menu_set_as" @tap="clickLogout()">Log uit</Button>
        </ActionBar>
        <FlexboxLayout class="page">
            <StackLayout class="form" verticalAlignment="center">

                <Label class="box1" text="Welkom bij"/>
                <Label class="box" text="Nostradamus"/>

                <Button class="button" @tap="clickClocking()"> In/Uit Klokken </Button>
                <Button class="button" @tap="clickPause()"> Pauze </Button>
            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
    import { mapGetters } from 'vuex';
    import localStorage from 'nativescript-localstorage';

    //const { VUE_APP_MODE, VUE_APP_PLATFORM } = process.env;

    export default {
        name: "Dashboard",
        data () {
            return {
                //props:[currentUser]
            };
        },
        created(){
            this.checkToken();
        },
        updated(){
            this.checkToken();
        },
        computed: {
            ...mapGetters({ currentUser: 'currentUser' })
        },
        methods: {
            clickLogout() {
                this.alert("U bent uitgelogd")
                this.$goto('logout');
                this.$navigateTo('logout');
            },
            clickPause() {
                this.$goto('break');
            },
            clickClocking() {
                this.$goto('clock');
            },
            checkToken(){
                if(!localStorage.token){
                    this.alert("Er is iets fout gegaan met de applicatie")
                    this.$goto('login');
                }
            },
            alert(message) {
                var dialogs = require("tns-core-modules/ui/dialogs");
                dialogs.alert({
                    title: "Melding",
                    message: message,
                    okButtonText: "Ok"
                });
            },

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

    .uitlog{
        color: white;
        background-color: #676A6C;
        margin-left: 800px;
        border-radius: 10px;
    }

    .page {
        /*align-items: center;*/
        flex-direction: column;
    }

    .form {
        margin-left: 30;
        margin-right: 30;
        flex-grow: 2;
        vertical-align: middle;
    }

    .box1 {
        horizontal-align: center;
        font-size: 35;
        text-align: center;
        color: #676A6C;
    }

    .box {
        horizontal-align: center;
        font-size: 40px;
        font-weight: bold;
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
        color: white;
    }

</style>