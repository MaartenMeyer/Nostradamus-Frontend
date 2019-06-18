<template native>
    <Page actionBarHidden="true">
        <FlexboxLayout class="page">

            <StackLayout class="form">
                <Image class="logo" src="~/assets/logos.png" />
                <Label class="header" text="Welkom" />

                <StackLayout class="input-field" marginBottom="25">
                    <TextField class="input" hint="Gebruikersnaam" keyboardType="text"
                               autocorrect="false" autocapitalizationType="none"
                               @returnPress="focusPassword" v-model="user.username"
                               returnKeyType="next" fontSize="18" />
                    <StackLayout class="hr-light" />
                </StackLayout>

                <StackLayout class="input-field" marginBottom="25">
                    <TextField ref="password" class="input" hint="Password"
                               secure="true" v-model="user.password" :returnKeyType="'done'"
                               fontSize="18" />
                    <StackLayout class="hr-light" />
                </StackLayout>

                <Button :text="'Login'" @tap="submit()" class="btn btn-primary m-t-20" />

            </StackLayout>


        </FlexboxLayout>
    </Page>
</template>

<script>
    import axios from "axios"
    import Dashboard from "./Dashboard.native.vue";
    import { request } from 'http';
    import { mapGetters } from 'vuex';
    import 'nativescript-localstorage';

    const userService = {
        login(user) {
            return new Promise(resolve => {
                resolve(user);
            })
        }
    };

    export default {
        name: 'Login',
        data() {
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
            focusPassword() {
                this.$refs.password.nativeView.focus();
            },

            submit() {
                //this.alert("pressed");
                if (!this.user.username || !this.user.password) {
                    console.log("invoer niet goed");
                    //quick test $goto, uncomment for faster
                    //testing in case of styling edits.
                    //this.$goto('dashboard')
                    this.alert("Gebruikersnaam en/of wachtwoord vergeten in te voeren.");
                    return;
                }else{
                    this.validate();
                }
            },

            validate() {
                // CHECK DATA
                //
                //url needs to be changed to server IP
                //local IP does not work with emulator/phys. device
                //Using 145.49.8.169:3000/api for testing
                //check local IP of device running back-end before testing yourself
                //https://www.whatismybrowser.com/detect/what-is-my-local-ip-address
                //
                var self = this;

                axios({
                    method: 'post',
                    url: 'http://145.49.8.169:3000/api/login',
                    data: { userName: this.user.username, password: this.user.password },
                    config: { headers: {'Content-Type': 'application/json' }}
                })
                .then(response => {
                    //console.log(response)
                    this.login(response);
                })
                .catch(() => this.loginFailed());

                axios.interceptors.response.use(function(response){
                    return response;
                })
            },
            login(response) {
                if(!response.data.token){
                    this.loginFailed();
                    return;
                }

                this.error = false;
                localStorage.token = response.data.token;
                this.$store.dispatch('login');
                this.loadData();
            },
            alert(message) {
                var dialogs = require("tns-core-modules/ui/dialogs");
                dialogs.alert({
                    title: "Melding",
                    message: message,
                    okButtonText: "Ok"
                });
            },
            loginFailed(){
                this.error = true;
                this.alert("Er ging iets mis met het verbinden van de applicatie.");
                delete localStorage.token;
            },
            loadData(){

                axios({
                    method: 'get',
                    url: 'http://145.49.8.169:3000/api/data/'+localStorage.userId,
                    config: { headers: {"Authorization" : "Bearer "+ localStorage.token+""}}})
                    .then((request) => 
                        this.loadDataSuccessful(request)
                    )
                    .catch((err) => {
                        if(err.response){
                            console.log("res "+ err.response)
                        }else{
                            console.log("req " + err.request.status)
                        }
                        this.loadDataFailed()
                    });
            },
            loadDataSuccessful(req){
                console.log("Load succes");
                localStorage.setItem('company', JSON.stringify(req.data));
                this.$goto('dashboard');
            },
            loadDataFailed(){
                console.log("Load-data Failed");
                this.alert("Er ging iets mis met het verbinden van de applicatie.");
            },
    }
};
</script>

<style scoped>
    .page {
        align-items: center;
        flex-direction: column;
        background-color: #F9F9F9;
    }

    .form {
        margin-left: 30;
        margin-right: 30;
        flex-grow: 2;
        vertical-align: middle;
    }

    .logo {
        height: 90;
        font-weight: bold;
    }

    .header {
        horizontal-align: center;
        font-size: 35;
        margin-bottom: 50;
        margin-top: 20;
        text-align: center;
        color: #00A0D1;
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
        background-color: #00A0D1;
        color: white;
        border-radius: 5;
        font-size: 20;
    }

</style>
