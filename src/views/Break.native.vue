<template>
    <Page actionBarHidden="false" backgroundSpanUnderStatusBar="true">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Pauze"></Label>
        </ActionBar>

        <FlexboxLayout class="page" verticalAlignment="center">
            <StackLayout class="invoer">
                <Label class="action" text="Voer je gegevens in:"></Label>
            </StackLayout>

            <StackLayout class="form">
                <TextField class="input" hint="Werknemersnummer" keyboardType="number" v-model="personNumber" />
                <Button :text="'Pauze'" @tap="clickValidatePause" class="button" />
            </StackLayout>
        </FlexboxLayout>
    </Page>    
</template>

<script>
    import axios from "axios/index"
    import HomePage from "./Dashboard";
    import { request } from 'http';
    import { mapGetters } from 'vuex';
    import 'nativescript-localstorage';    

    export default {
        name: "Break.native",
        data(){
            return {
                user: {
                    username: "",
                    password: ""
                }
            };
        },
    computed: {
            ...mapGetters({ currentUser: 'currentUser' })
        },

    methods: {
        clickValidatePause() {
            if (this.personNumber == null) {
                this.alert("Er is geen werknemersnummer ingevoerd.");
            } else {
                this.clickStartPause();
            }
        },
        clickStartPause() {
                console.log("pause");
                var self = this;
                var token = this.localStorage.token;
                axios({
                    method: 'post',
                    url: 'http://145.49.8.169:3000/api/breaking',
                    data: { userNumber: this.currentUser.userNumber },
                    headers: {'Authorization': "bearer " + localStorage.token}
                })
                .then(request => this.breakSuccessful(request))
                .catch(() => this.breakFailed());
                //this.alert(this.personNumber + " is het personeels nummer.");
                //this.toHome();
            },
            breakSuccessful(){
                this.alert("Pauze gestart, uw werknemersnummer is " +localStorage.user.personNumber);
                this.toHome();
            },
            breakFailed(){
                this.alert("Er ging iets fout met het pauzeren")
            },            
            toHome(){
            console.log("going home");
            this.$goto('dashboard');
        },
        alert(message) {
            return confirm({
                title: "Test message",
                okButtonText: "OK",
                message: message
            });
        }
    }
}

</script>

<style scoped>
    .action-bar-title{
        font-size: 25px;
    }

    .page {
        /*align-items: center;*/
        flex-direction: column;
    }

    .invoer {
        margin-left: 30;
        margin-right: 30;
        margin-bottom: 80;
        flex-grow: 2;
    }

    .form {
        margin-left: 30;
        margin-right: 30;
        flex-grow: 2;
        vertical-align: middle;
    }

    .action{
        font-family: "Helvetica Neue", "Helvetica Neue Light", Helvetica;
        font-weight: bold;
        font-size: 28px;
        text-align: center;
        margin-top: 30px;
        margin-bottom: 80px;
        color: #676A6C;
    }

    .input {
        font-size: 20px;
        margin-top: 30px;
        placeholder-color: #A8A8A8;
        text-align: center;
    }

    .input-field .input {
        font-size: 20px;
        font-weight: bold;
    }

    .button {
        height: 50;
        margin: 30 5 15 5;
        background-color: #00A0D1;
        border-radius: 10px;
        font-size: 20px;
        margin-top: 60;
        margin-bottom: 30px;
        color: white;
    }

</style>