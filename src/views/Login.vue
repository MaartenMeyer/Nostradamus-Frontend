<template web>
  <div class="mainDiv">
      <link href='https://fonts.googleapis.com/css?family=Roboto' rel="stylesheet">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">

      <div class="formBox">

          <h2 class="titleMain1">Welkom bij</h2>
          <h2 class="titleMain2">Nostradamus</h2>

          <div class="loginDiv">
              <input class="loginInput" type="text" v-model="input.username" placeholder="Gebruikersnaam" name="email"/><br>
              <input class="loginInput" type="password" v-model="input.password" placeholder="Wachtwoord" name="password"/><br>
              <p class="errorMsg" v-if="error">{{ errorMessage }}</p>
              <button type="button" class="submitBtn" v-on:click="login()"><span>Login</span></button>
          </div>

      </div>
    </div>
</template>

<script>

    import { request } from 'http';
    import { mapGetters } from 'vuex'
    import rs from '../api/RequestService'

    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                },
                error: false,
                errorMessage: ""
            }
        },
        computed: {
        ...mapGetters({ currentUser: 'currentUser' })
        },
        // Checks if user is already logged in when loading site
        created(){
            this.checkLogin();
        },
        // Checks if user is already logged in when refreshing site
        updated(){
            this.checkLogin();
        },
        methods: {
            checkLogin(){
                if(this.currentUser){
                    this.$router.replace(this.$route.query.redirect || '/dashboard');
                }
            },
            login() {
                if(this.input.username != "" && this.input.password != ""){
                    let promise = rs.postLogin(this.input.username, this.input.password);
                    promise.then(response => this.loginSuccessful(response))
                           .catch((error) => {
                                if(error.response){
                                    if(error.response.status == 401){
                                        this.showErrorMessage("Gebruikersnaam of wachtwoord onjuist!", true);
                                    }
                                }else if (error.request.status == 0){
                                    this.showErrorMessage("Inloggen niet mogelijk. Geen verbinding met server!", true);
                                }
                            });
                }else{
                    this.showErrorMessage("Voer een gebruikersnaam en wachtwoord in!", true);
                }
            },
            loginSuccessful(response){
                if(!response.data.token){
                    this.loginFailed();
                    return;
                }

                this.error = false;
                this.$cookie.set('access-token', response.data.token);
                this.$store.dispatch('login');
                this.loadData();
            },
            // Shows error message with text of parameter string if parameter status is true
            showErrorMessage(string, status){
                this.errorMessage = string;
                this.error = status;
            },
            loadData(){
                let promise = rs.getData(this.$cookie.get('user-id'), this.$cookie.get('access-token'));
                promise.then(response => this.loadDataSuccessful(response))
                       .catch((error) => this.loadDataFailed());
            },
            loadDataSuccessful(response){
                localStorage.setItem('company', JSON.stringify(response.data));
                this.loadUsers();
            },
            loadDataFailed(){

            },
            loadUsers(){
                let promise = rs.getUsers(this.$cookie.get('user-id'), this.$cookie.get('access-token'));
                promise.then(response => this.loadUsersSuccessful(response))
                       .catch(error => this.loadUsersFailed());
            },
            loadUsersSuccessful(response){
                localStorage.setItem('users', JSON.stringify(response.data));
                this.$router.replace('/dashboard');
            },
            loadUsersFailed(){

            }
        }
    }
</script>

<style scoped>
    .mainDiv {
        width: 100%;
        min-height: 100vh;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 1;
    }

    /* Form div */
    .formBox {
        width: 350px;
        height: 400px;
        background: #fff;
        border-radius: 15px;
        overflow: hidden;
        margin: 0 auto 0 auto;
        padding:0px 0px 20px 0px;
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
    }

    /* login Div */
    .loginDiv{
        text-align: center;
        flex-grow: 2;
        vertical-align: middle;
    }

    /* Main titles */
    .titleMain1 {
        font-family: "Helvetica Neue", "Helvetica Neue Light", Helvetica;
        font-size: 28px;
        text-align: center;
        margin-bottom: -15px;
        margin-top: 60px;
        color: #676A6C;
    }
    .titleMain2 {
        font-family: "Helvetica Neue", "Helvetica Neue Light", Helvetica;
        font-size: 28px;
        text-align: center;
        margin-bottom: 20px;
        color: #676A6C;
    }

    /* Input fields */
    input[type=text] {
        width: 300px;
        font-family: "Roboto";
        font-size: 16px;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #00A0D1;
        background: transparent;
    }
    input[type=password] {
        width: 300px;
        font-family: "Roboto";
        font-size: 16px;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #00A0D1;
        background: transparent;
    }
    input:focus{
        outline: none;
    }

    /* Login button style */
    .submitBtn{
        font-family: "Roboto";
        font-size: 21px;
        background-color: #00A0D1;
        padding: 20px;
        border: 4px solid #00A0D1;
        border-radius: 5px;
        display: inline-block;
        width: 150px;
        margin-top: 20px;
        margin-bottom: 10px;
        color: white;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        outline: none;
        position: relative;
        transition: transform 0.25s;
        transition: 0.5s;
        z-index: 1;
    }
    .submitBtn:after {
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        content: "\f2f6";
        position: absolute;
        opacity: 0;
        right: -20px;
        transition: 0.5s;
        z-index: -1;
    }
    .submitBtn:hover {
        background-color: #00799e;
        border: 4px solid #00799e;
        padding-right: 24px;
        padding-left:8px;
    }
    .submitBtn:hover:after {
        opacity: 1;
        right: 10px;
    }
    .submitBtn:active {
        transform: scale(.95);
    }

    .errorMsg {
        font-family: Roboto;
        font-weight: bold;
        font-size: 11px;
        margin-top: 10px;
        margin-bottom: 0px;
        color: red;
    }

</style>
