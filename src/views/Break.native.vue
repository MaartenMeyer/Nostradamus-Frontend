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
                <TextField class="input" hint="Werknemersnummer" keyboardType="number" v-model="userNumber" />
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
    import localStorage from 'nativescript-localstorage';    

    export default {
        name: "Break",
        data(){
            return {
                userNumber: null,
                breakEntry: {
                    userNumber: ""
                }
            };
        },
    computed: {
            ...mapGetters({ currentUser: 'currentUser' })
        },

    methods: {
        //Checks is userNumber is valid
        clickValidatePause() {
            if (this.userNumber == null) {
                this.alert("Er is geen werknemersnummer ingevoerd.");
            } else {
                this.clickStartPause();
            }
        },
        //Sends http request to server
        //Sends userNumber
        //and token from localStorage.token
        clickStartPause() {
                console.log("Pause");
                var self = this;
                let token = localStorage.token;
                this.breakEntry.userNumber = this.userNumber;
                console.log("local userNumber " + this.breakEntry.userNumber);
                axios({
                    method: 'post',
                    url: 'http://145.49.8.169:3000/api/breaking',
                    data: {
                         userNumber: this.breakEntry.userNumber
                         },
                    headers: {'Authorization': "bearer " + token}
                })
                .then((response) =>
                    this.breakSuccessful(response)
                )
                .catch((error) =>{ 
                    if(error.response){
                        this.breakFailed()
                    }
                })

        },
        //Sends alert based on message
        //from response.data.message
        breakSuccessful(response){
           if(response.status == 200){
               //User clocks in break     
                if (response.data.message === "User break clocked in."){
                    this.alert("Pauze gestart, uw werknemersnummer is: " + this.userNumber);
                } 
                //User clocks off break
                else if (response.data.message === "User break clocked off.") {
                    this.alert("Pauze gestopt, uw werknemersnummer is: " + this.userNumber);
                }
                this.toHome();
           } else{
               this.breakFailed();
           }
        },
        //Error handling for Break
        breakFailed(){
                this.alert("Er ging iets fout met het pauzeren")
        },
        //Navigate back to Dashboard
        toHome(){
            console.log("going home");
            this.$goto('dashboard');
        },
        //Definition for alert
        alert(message) {
            var dialogs = require("tns-core-modules/ui/dialogs");
            dialogs.alert({
                title: "Melding",
                message: message,
                okButtonText: "Ok"
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