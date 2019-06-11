<template native>
    <Page actionBarHidden="true">
        <FlexboxLayout class="page">
            <StackLayout class="form">
                <Image class="logo" src="~/assets/logos.png" />
                <Label class="header" text="ClockSystem" />

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

                <Button :text="'Log In'" @tap="submit()" class="btn btn-primary m-t-20" />
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

    // Deprecated consts, remove during cleanup
    // const Toast = require('nativescript-toast');
    // const axios = require('axios/index');
    // const Dashboard = require('./Dashboard.native.vue');
    // const { request } = require('http');
    // const { mapGetters } = require('vuex');

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
        //TODO; dunk deprecated data, remove console.log()
        //checking for current user does not work at this time
        //using similar methods to web version
        //throws error; undefined mapGetters

        computed: {
        ...mapGetters({ currentUser: 'currentUser' })
        },
        // //Checks if user is already logged in when loading site
        // created(){
        //     this.checkLogin();
        // },
        // //Checks if user is already logged in when refreshing site
        // updated(){
        //     this.checkLogin();
        // },        

        methods: {
            // checkLogin(){
            //     if(this.currentUser){
            //         this.$navigateTo(Dashboard);
            //     }
            //},
            focusPassword() {
                this.$refs.password.nativeView.focus();
            },
 
            submit() {
                console.log("here");
                //this.alert("pressed");
                if (!this.user.username || !this.user.password) {
                    console.log("invoer niet goed");
                    // this.alert(
                    //     "Email en/of wachtwoord vergeten in te voeren.");
                    return;
                }
                await this.validate();
                this.login(loginRequest);
            },

            async validate() {
                
                // CHECK DATA
                //
                //url needs to be changed to server IP
                //local IP does not work with emulator/phys. device
                //Using 145.49.8.169:3000/api for testing
                //check local IP of device running back-end before testing yourself
                //https://www.whatismybrowser.com/detect/what-is-my-local-ip-address
                //
                
                var self = this;

                console.log("async")
                axios({
                    method: 'post',
                    url: 'http://145.49.8.169:3000/api/login',
                    data: { userName: this.user.username, password: this.user.password },
                    config: { headers: {'Content-Type': 'application/json' }}
                    })
                    .then(request => {
                        console.log("resp")
                        loginRequest = this.request;
                        return loginRequest;
                    })
                    .catch(() => this.loginFailed());
                
                

                // postLogin().then(request => userService.login(request).then(request => this.login(request)));
                // console.log("post-async");

                // axios.interceptors.request.use(function (config){
                //     let token = localStorage.token;
                // },
                // function (response){
                //     return Promise.resolve(response);
                // })
                
                // axios({
                // method: 'post',
                // url: 'http://145.49.8.169:3000/api/login',
                // data: { userName: this.user.username, password: this.user.password },
                // config: { headers: {'Content-Type': 'application/json' }}
                // })
                // .then(request => {
                //     console.log(request.status);
                //     this.login(request);
                // })
                // .catch(() => this.loginFailed());
                // console.log(request.status);
                
                // axios.interceptors.response.use(function(response){
                //     return response;
                // })            
            },
            login(req) {
                console.log("Request bla: "+req.status);
                //console.log("Log redata: "+req.data);
                if(!req.data.token){
                    console.log("token-fail")
                    this.loginFailed();
                    return;
                }

                console.log("token-get");
                this.error = false;
                localStorage.token = req.data.token;
                this.$store.dispatch('login');
                await this.loadData();
                console.log("login-end");
                this.$router.push('/dashboard');
            },
            alert(message) {
                //console.log("fired");
                return alert({
                    title: "Oops",
                    okButtonText: "OK",
                    message: message
                });
            },
            loginFailed(){
                this.error = true;
                this.alert(
                    "Er ging iets mis met het verbinden van de applicatie."
                );
                console.log("failed");
                delete localStorage.token;
            },
            async loadData(){
                axios({
                    method: 'get',
                    url: 'http://145.49.8.169:3000/api/data/'+localStorage.userId,
                    config: { headers: {"Authorization" : "Bearer "+ localStorage.token+""}}})
                    .then(request => this.loadDataSuccessful(request))
                    .catch(() => this.loadDataFailed());
            },   
            loadDataSuccessful(req){
                console.log("Load succes");
                // localStorage.setItem('company', JSON.stringify(req.data));
                console.log("user service");
                // userService
                //     .login(this.user)
                //     .then(() => {
                //         console.log("navigate");
                //         this.$navigateTo(Dashboard, {
                //             props: { 
                //                 currentUser
                //             },
                //             animated: true,
                //             transition: {
                //                 name: "slideTop",
                //                 duration: 380,
                //                 curve: "easeIn"
                //             }
                //         });
                this.$router.push('/dashboard');
                    // })
                    // .catch(() => {
                    //     this.alert(
                    //         "Er ging iets mis met het verbinden van de applicatie."
                    //     );
                    //});
            },
            loadDataFailed(){
                console.log("yikes");
                //Needs to be filled with something
            } 
    }
};    
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
