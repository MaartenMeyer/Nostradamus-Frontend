<template web>
    <div class="mainDiv">
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel="stylesheet">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">

        <div class="formBox">

            <h2 class="titleMain">Voer je gegevens in:</h2>

            <div class="loginDiv">
                <input class="clockInput" type="text" v-model.lazy="userNumber" v-debounce="delay" placeholder="Werknemersnummer" name="Werknemersnr"/><br>

                <p class="errorMsg" v-if="error">{{ errorMessage }}</p>

                <div class="buttonsDiv">
                    <button type="button" class="submitBtn" :disabled="disabled" v-on:click="clockBreak()"><span>Pauze</span></button>
                </div>
                <div class="buttonsDiv">
                    <button type="button" class="buttonCancel" v-on:click="cancel()"><span>Annuleer</span></button>
                </div>
            </div>
            <modal id="modal" v-show="isModalVisible" @close="closeModal()"/>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import { mapGetters } from 'vuex'
    import modal from './Modal.vue';
    import debounce from 'v-debounce'
    import rs from '../api/RequestService'

    const { VUE_APP_MODE, VUE_APP_PLATFORM } = process.env;

    export default {
        name: 'Break',
        components: {
            modal,
        },
        data() {
            return {
                userNumber: "",
                error: false,
                errorMessage: "",
                isModalVisible: false,
                delay: 500,
                disabled: false,
                userNumbers: []
            }
        },
        watch: {
            // Watches for changes to the userNumber input field with delay declared in data()
            userNumber () {
                this.checkUsernumberValidity();
            }
        },
        directives: {
            debounce
        },
        computed: {
            ...mapGetters({ currentUser: 'currentUser' })
        },
        mounted(){
            this.addUsersToArray();
        },
        methods: {
            // Gets userNumbers of company from storage and adds them to array userNumber for faster access
            addUsersToArray(){
                if(this.userNumbers.length == 0){
                    this.userNumbers = [];

                    let jsonObj = JSON.parse(localStorage.getItem('users'));
                    let users = jsonObj.users;

                    for(var i = 0; i < users.length; i++) {
                        this.userNumbers.push(users[i].userNumber)
                    }
                }
            },
            // Checks if userNumber entered into input field is present in the array userNumbers
            checkUsernumberValidity(){
                if(this.userNumbers.includes(parseInt(this.userNumber, 10))){
                    this.showErrorMessage("", false);
                    this.disabled = false;
                }else{
                    if(this.userNumber != ""){
                        this.disabled = true;
                        this.showErrorMessage("Medewerkersnummer ongeldig!", true);
                    }else{
                        this.disabled = false;
                        this.showErrorMessage("", false);
                    }
                }
            },
            clockBreak(){
                if(this.userNumber != ""){
                    let promise = rs.postBreakEntry(this.userNumber, this.$cookie.get('access-token'));
                    promise.then(response => {
                                this.clockBreakSuccessful(response);
                            })
                            .catch((error) => {
                                this.showErrorMessage("Pauze niet ingeklokt. Je bent nog niet ingeklokt!", true)
                            })
                }else{
                    this.showErrorMessage("Voer een werknemersnummer in!", true)
                }
            },
            // Called when clock break-in/out is successful
            // Parameter object is response from api call to api/breaking
            clockBreakSuccessful(object) {
                let date = new Date();
                let time = ('0' + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);

                if (object.data.message === "User break clocked in."){
                    this.showModal("<b>Pauze ingeklokt!</b><br><br>Werknemersnummer: " + this.userNumber + "<br>Begintijd: " + time + "<br>Fijne pauze!");
                } else if (object.data.message === "User break clocked off.") {
                    this.showModal("<b>Pauze uitgeklokt!</b><br><br>Werknemersnummer: " + this.userNumber + "<br>Eindtijd: " + time)
                }
            },
            // Changes to dashboard view
            cancel(){
                this.$router.push('/dashboard');
            },
            // Shows error message with text of parameter string if parameter status is true
            showErrorMessage(string, status){
                this.errorMessage = string;
                this.error = status;
            },
            // Shows pop-up modal with text of parameter string
            showModal(string) {
                console.log(string);
                $("#modalDescription").html(string);
                this.isModalVisible = true;
            },
            // Closes pop-up modal and changes to dashboard view
            closeModal() {
                this.isModalVisible = false;
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
        height: 450px;
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

    /* Main title */
    .titleMain{
        font-family: "Helvetica Neue", "Helvetica Neue Light", Helvetica;
        font-size: 28px;
        text-align: center;
        margin-top: 30px;
        margin-bottom: 30px;
        color: #676A6C;
    }

    /* Input fields */
    input[type=text] {
        width: 300px;
        font-family: "Roboto";
        font-size: 16px;
        color: #676A6C;
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

    .buttonsDiv{
        text-align: center;
        flex-grow: 2;
        vertical-align: middle;
        margin-top: 10px;
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
        margin-top: 40px;
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
        content: '\f0a9';
        font-weight: 900;
        position: absolute;
        opacity: 0;
        right: -20px;
        transition: 0.5s;
    }
    .submitBtn:hover{
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

    .buttonCancel {
        font-family: "Roboto";
        font-size: 21px;
        background-color: #676A6C;
        padding: 20px;
        border: 4px solid #676A6C;
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
    .buttonCancel:after {
        font-family: "Font Awesome 5 Free";
        content: '\f0a9';
        font-weight: 900;
        position: absolute;
        opacity: 0;
        right: -20px;
        transition: 0.5s;
    }
    .buttonCancel:hover{
        background-color: #4b4d4f;
        border: 4px solid #4b4d4f;
        padding-right: 24px;
        padding-left:8px;
    }
    .buttonCancel:hover:after {
        opacity: 1;
        right: 10px;
    }
    .buttonCancel:active {
        transform: scale(.95);
    }

    .errorMsg{
        font-family: Roboto;
        font-weight: bold;
        font-size: 11px;
        margin-top: 20px;
        margin-bottom: 0px;
        color: red;
    }

</style>