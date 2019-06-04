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

                <Button :text="'Log In'" @tap="submit" class="btn btn-primary m-t-20" />
            </StackLayout>


        </FlexboxLayout>
    </Page>
</template>

<script>
    const userService = {
        login(user) {
            return Promise.resolve(user);
        }
    };

    // import axios from "axios/index"
    // import Dashboard from "./Dashboard.native.vue";
    // import { request } from 'http';
    // import { mapGetters } from 'vuex'
    // const axios = require('axios/index');
    // const Dashboard = require('./Dashboard.native.vue');
    // const { request } = require('http');
    // const { mapGetters } = require('vuex');

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
        //checking for current user does not work at this time
        //using similar methods to web version
        //throws error; undefined mapGetters

        // computed: {
        // ...mapGetters({ currentUser: 'currentUser' })
        // },
        // //Checks if user is already logged in when loading site
        // created(){
        //     this.checkLogin();
        // },
        // //Checks if user is already logged in when refreshing site
        // updated(){
        //     this.checkLogin();
        // },        

        // computed: {
        //     currentUser = this.user
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
                if (!this.user.username || !this.user.password) {
                    this.alert(
                        "Email en/of wachtwoord vergeten in te voeren.");
                    return;
                }
                this.validate();
            },
            validate() {
                
                // CHECK DATA
                // axios({
                // method: 'post',
                // //this needs to be changed to server IP
                // //currently local IP, does not work with emulator/phys. device
                // //Using 192.168.2.146:3000/api for testing
                // //check local IP before testing yourself
                // url: 'http://145.49.8.169:3000/api/login',
                // data: { userName: this.user.username, password: this.user.password },
                // config: { headers: {'Content-Type': 'application/json' }}
                // })
                // .then(request => this.login(request))
                // .catch(() => this.loginFailed());
            },
            login(req) {
                if(!req.data.token){
                    this.loginFailed();
                    return;
                }
                this.error = false;
                //localStorage.token = req.data.token;
                userService
                    .login(this.user)
                    .then(() => {
                        this.$navigateTo(Dashboard, {
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
                    })
                    .catch(() => {
                        this.alert(
                            "Er ging iets mis met het verbinden van de applicatie."
                        );
                    });
            },
            alert(message) {
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
                //delete localStorage.token;
            }
            //Uncommented chunk of code, no idea what it means
            //

            // login: (e) => {
            //           e.preventDefault();
            //           let email = e.target.elements.email.value;
            //           let password = e.target.elements.password.value;

            //           let login = () => {
            //               let data = {
            //                   email: email,
            //                   password: password
            //               };

            //               axios.post("/api/login", data)
            //                   .then((response) => {
            //                       console.log("Logged in");
            //                       this.$router.push("/dashboard")
            //                   })
            //                   .catch((errors) => {
            //                       console.log("Cannot log in")
            //                   })
            //           };
            //           login();
            //     }
            //    }
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
