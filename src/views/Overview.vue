<template>
    <div class="mainDiv">
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel="stylesheet">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">

        <div class="formBox">
            <h2 class="titleMain">Uren overzicht</h2>

            <div class="overviewDiv">

                <select id="overviewFilter" >
                    <option value="">Werknemersnummer</option>
                    <option value="">Voornaam</option>
                    <option value="">Achternaam</option>
                    <option value="">Datum</option>
                </select>

                <input class="overviewInput" id='overviewInput' type="text" v-model.lazy="userNumber" v-debounce="delay" placeholder="Filter op..." name="filterInput" /><br>

                <button class="submitBtn" v-on:click="">Filter</button>

                    <table border="1" class="overviewTable">
                        <tr>
                            <th>ID</th>
                            <th>Werknemersnummer</th>
                            <th>Naam</th>
                            <th>Datum</th>
                            <th>Starttijd</th>
                            <th>Eindtijd</th>
                            <th>Pauze</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>Admin</td>
                            <td>01-01-1900</td>
                            <td>18:00</td>
                            <td>23:00</td>
                            <td>0:15</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>Admin</td>
                            <td>01-01-1900</td>
                            <td>18:00</td>
                            <td>23:00</td>
                            <td>0:15</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>Admin</td>
                            <td>01-01-1900</td>
                            <td>18:00</td>
                            <td>23:00</td>
                            <td>0:15</td>
                        </tr>
                    </table>

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
        name: "Overview",


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

    /* overview Div */
    .overviewDiv {
        text-align: center;
        flex-grow: 2;
        vertical-align: middle;
    }

    /* Form div */
    .formBox {
        width: 800px;
        height: 400px;
        background: #fff;
        border-radius: 15px;
        overflow: hidden;
        margin: 0 auto 0 auto;
        padding:0px 0px 20px 0px;
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
    }

    /* Main title */
    .titleMain{
        font-family: "Helvetica Neue", "Helvetica Neue Light", Helvetica;
        font-size: 28px;
        text-align: center;
        margin-bottom: 5px;
        margin-top: 30px;
        color: #676A6C;
    }

    /* Select options styling */
    select {
        font-family: "Roboto";
        color: #676A6C;
        width: 300px;
        font-size: 16px;
        margin-top: 20px;
        margin-right: 5px;
        margin-left: 50px;
        outline: none;
        border: none;
        border-bottom: 1px solid #00A0D1;
        cursor: pointer;
        float: left;
    }
    select:focus {
        border: none;
        border-bottom: 1px solid #00A0D1;
        cursor: pointer;
    }
    select:hover {
        border: none;
        border-bottom: 1px solid #00A0D1;
        cursor: pointer;
    }

    /* Input fields */
    input[type=text] {
        width: 200px;
        font-family: "Roboto";
        font-size: 16px;
        margin-top: 20px;
        float: left;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #00A0D1;
        background: transparent;
    }
    input:focus{
        outline: none;
    }

    /* Filter button style */
    .submitBtn{
        font-family: "Roboto";
        font-size: 13px;
        background-color: #00A0D1;
        border: 4px solid #00A0D1;
        border-radius: 5px;
        display: inline-block;
        width: 70px;
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 5px;
        float: left;
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
    .submitBtn:hover {
        background-color: #00799e;
        border: 4px solid #00799e;
    }
    .submitBtn:active {
        transform: scale(.95);
    }

    /* Overview table styling */
    .overviewTable {
        font-family: "Roboto";
        margin-top: 10px;
        border-collapse: collapse;
        width: 101%;
        border-top: none;
    }
    th {
        background-color: #00A0D1;
        color: white;
        text-align: left;
        height: 40px;
        padding-left: 5px;
        border-bottom: 1px solid #ddd;
        border-left: none;
        border-right: none;
    }
    td {
        text-align: left;
        padding-left: 5px;
        height: 40px;
        border-bottom: 1px solid #ddd;
        border-left: none;
        border-right: none;
    }
    tr:hover {
        background-color: #676a6c;
        color: white;
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

    .errorMsg {
        font-family: Roboto;
        font-weight: bold;
        font-size: 11px;
        margin-top: 10px;
        margin-bottom: 0px;
        color: red;
    }
</style>
