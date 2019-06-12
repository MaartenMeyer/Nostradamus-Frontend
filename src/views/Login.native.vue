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
<!--                    <p class="errorMsg" v-if="error">Gebruikersnaam of wachtwoord onjuist!</p>-->
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
                //this.alert("pressed");
                if (!this.user.username || !this.user.password) {
                    console.log("invoer niet goed");
                    this.$goto('dashboard')

                    this.alert(
                        "Email en/of wachtwoord vergeten in te voeren.");
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

                // axios.interceptors.request.use(function (config){
                //     let token = localStorage.token;
                // },
                // function (response){
                //     return Promise.resolve(response);
                // })

                var self = this;

                axios({
                    method: 'post',
                    url: 'http://192.168.2.6:3000/api/login',
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

                // postLogin().then(request => userService.login(request).then(request => this.login(request)));
                // console.log("post-async");



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


            },
            login(response) {
                //console.log("Request : "+response.status);
                //console.log("Log redata: "+req.data);
                if(!response.data.token){
                    this.loginFailed();
                    return;
                }

                this.error = false;
                localStorage.token = response.data.token;
                //console.log('token ' + localStorage.token);
                this.$store.dispatch('login');
                
                //this.$goto('dashboard');
                this.loadData();
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

                delete localStorage.token;
            },
            loadData(){
                // console.log(localStorage.userId);
                axios({
                    method: 'get',
                    url: 'http://192.168.2.6:3000/api/data/'+localStorage.userId,
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
                        //console.log(err);
                        this.loadDataFailed()
                    });
            },
            loadDataSuccessful(req){
                console.log("Load succes");
                // this.$router.push('dasboard');
                this.$goto('dashboard');
                // localStorage.setItem('company', JSON.stringify(req.data));
                //console.log("user service");
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

                //console.log("navigate");
                // this.$navigateTo(Dashboard, {
                //             props: {
                //                 currentUser
                //             },
                //             animated: true,
                //             transition: {
                //                 name: "slideTop",
                //                 duration: 380,
                //                 curve: "easeIn"
                //             }
                // });
                //console.log("push-error")


                    // })
                    // .catch(() => {
                    //     this.alert(
                    //         "Er ging iets mis met het verbinden van de applicatie."
                    //     );
                    //});
            },
            loadDataFailed(){
                console.log("Load-data Failed");
                this.alert("Er ging iets mis met het verbinden van de applicatie.");
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
        height: 90;
        font-weight: bold;
    }

    .header {
        horizontal-align: center;
        font-size: 35;
        margin-bottom: 70;
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

    /*.errorMsg{*/
    /*    font-family: Roboto;*/
    /*    font-weight: bold;*/
    /*    font-size: 11px;*/
    /*    margin-top: 10px;*/
    /*    margin-bottom: 0px;*/
    /*    color: red;*/
    /*}*/

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
