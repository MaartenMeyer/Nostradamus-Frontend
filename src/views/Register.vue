<template>
    <div class="mainDiv">
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel="stylesheet">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">

        <div class="formBox">

            <h2 class="titleMain">Registreer nieuwe gebruiker</h2>

            <div class="registerDiv">
                <input class="registerInput" type="text" placeholder="Voornaam" name="Voornaam"/><br>
                <input class="registerInput" type="text"  placeholder="Achternaam" name="Achternaam"/><br>
                <input class="registerInput" type="text"  placeholder="Gebruikersnaam" name="Gebruikersnaam"/><br>
                <input class="registerInput" type="email"  placeholder="Email" name="email"/><br>
                <input class="registerInput" type="number"  placeholder="Werknemersnummer" name="Werknemersnummer"/><br>
                <input class="registerInput" type="password"  placeholder="Wachtwoord" name="password"/><br>

                <p class="errorMsg" v-if="error">Formulier nog niet volledig ingevuld!</p>

<!--                <vue-touch-keyboard id="keyboard" v-if="visible" :layout="layout" :cancel="hide" :accept="accept" :input="inputField" :next="next" />-->

                <button type="button" class="submitBtn" v-on:click=""><span>Registreer</span></button>
            </div>
        </div>

        <div class="buttons">
            <button class="buttonLogOut" v-on:click="logout()"><i class="fas fa-sign-out-alt"></i></button>
        </div>

        <div class="buttons">
            <button class="buttonBack" v-on:click="back()"><i class="fas fa-arrow-alt-circle-left"></i></button>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    import { mapGetters } from 'vuex'
    import VueCookie from 'vue-cookie';
    import idbs from '../api/indexedDBService'

    const { VUE_APP_MODE, VUE_APP_PLATFORM } = process.env;

    export default {
        name: "Register",


        methods: {
            logout() {
                this.$router.push('/logout');
            },
            back() {
                this.$router.push('/dashboard');
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
        width: 450px;
        height: 470px;
        background: #fff;
        border-radius: 15px;
        overflow: hidden;
        margin: 0 auto 0 auto;
        padding:0px 0px 20px 0px;
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
    }

    /* Register Div */
    .registerDiv {
        text-align: center;
        flex-grow: 2;
        vertical-align: middle;
    }

    /* Main title */
    .titleMain{
        font-family: "Helvetica Neue", "Helvetica Neue Light", Helvetica;
        font-size: 28px;
        text-align: center;
        margin-bottom: 3px;
        margin-top: 40px;
        color: #676A6C;
    }

    /* Input fields */
    input[type=text] {
        width: 300px;
        font-family: "Roboto";
        font-size: 16px;
        padding: 6px 20px;
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
        padding: 6px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #00A0D1;
        background: transparent;
    }
    input[type=email] {
        width: 300px;
        font-family: "Roboto";
        font-size: 16px;
        padding: 6px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #00A0D1;
        background: transparent;
    }
    input[type=number] {
        width: 300px;
        font-family: "Roboto";
        font-size: 16px;
        padding: 6px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #00A0D1;
        background: transparent;
    }
    input:focus{
        outline: none;
    }

    /* Log out button */
    .buttonLogOut {
        font-family: "Roboto";
        position:absolute;
        top: -15px;
        right: 0;
        font-size: 25px;
        background-color: #676a6c;
        padding: 10px;
        border: 4px solid #676a6c;
        border-radius: 5px;
        display: inline-block;
        width: 60px;
        margin-right: 5px;
        color: white;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        outline: none;
        transition: transform 0.3s;
        transition: 0.5s;
        z-index: 1;
        box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
        0 17px 50px 0 rgba(0, 0, 0, 0.19);
    }
    .buttonLogOut:hover {
        background-color: #4b4d4f;
        border: 4px solid #4b4d4f;
        transform: scale(0.85);
        transition: 0.5s;
        font-size: 27px;
    }
    .buttonLogOut:after {
        z-index: -1;
    }
    .buttonLogOut:active {
        transform: scale(0.95);
    }

    /* Back button */
    .buttonBack {
        font-family: "Roboto";
        position:absolute;
        top: 60px;
        right: 0;
        font-size: 25px;
        background-color: #676a6c;
        padding: 10px;
        border: 4px solid #676a6c;
        border-radius: 5px;
        display: inline-block;
        width: 60px;
        margin-right: 5px;
        color: white;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        outline: none;
        transition: transform 0.3s;
        transition: 0.5s;
        z-index: 1;
        box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
        0 17px 50px 0 rgba(0, 0, 0, 0.19);
    }
    .buttonBack:hover {
        background-color: #4b4d4f;
        border: 4px solid #4b4d4f;
        transform: scale(0.85);
        transition: 0.5s;
        font-size: 27px;
    }
    .buttonBack:after {
        z-index: -1;
    }
    .buttonBack:active {
        transform: scale(0.95);
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
        content: "\f4fc";
        font-weight: 900;
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
        right: 1px;
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